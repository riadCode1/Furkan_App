import {
  View,
  Text,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { Provider } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

import { fetChapterInfo, fetchSuwar } from "../../API/QuranApi";
import Listen from "../../../components/Listen";
import Details from "../../../components/Details";
import Read from "../../../components/Read";
import { NewData } from "../../../constants/NewData";


let { width, height } = Dimensions.get("window");

const Readers = () => {
  const params = useLocalSearchParams();
  const { name, Chapterid, arab_name ,chapter_arab} = params;
  const router = useRouter();

  const [activeButton, setActiveButton] = useState("button1");

  const [quranData, setQuranData] = useState([]);
  const [chapterInfo, setchapterInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getReciter();

    getChapterInfo(Chapterid);
  }, [Chapterid]);

  const getReciter = async () => {
    const data = await fetchSuwar();

    // Example of hardcoded data (NewData)

    if (data && data.recitations) {
      // Create a Set to keep track of unique IDs
      const idSet = new Set();

      // Add fetched data to the set while filtering duplicates
      const uniqueFetchedData = data.recitations.filter((reciter) => {
        if (idSet.has(reciter.id)) {
          return false; // Skip if ID already exists
        }
        idSet.add(reciter.id); // Add ID to the set
        return true; // Include this reciter
      });

      // Add NewData recitations to the set while filtering duplicates
      const uniqueNewData = NewData.recitations.filter((reciter) => {
        if (idSet.has(reciter.id)) {
          return false; // Skip if ID already exists
        }
        idSet.add(reciter.id); // Add ID to the set
        return true; // Include this reciter
      });

      // Combine unique fetched data with unique hardcoded data
      const combinedData = [...uniqueFetchedData, ...uniqueNewData];
      setQuranData(combinedData.splice(1)); // Set the concatenated data to state
    }
  };

  const getChapterInfo = async (id) => {
    const data = await fetChapterInfo(id);
    //console.log("ChapteInfo:", data.chapter_info);
    if (data && data.chapter_info) setchapterInfo(data.chapter_info);
  };

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  const getBackgroundColor = (button) => {
    return activeButton === button ? "#00D1FF" : "transparent";
  };

  {
    /*SearchData */
  }

  useEffect(() => {
    if (searchQuery.length > 1) {
      setloading(true);

      // Hardcoded data

      // Fetch recitations based on the search query
      fetchSuwar(searchQuery)
        .then((suwarData) => {
          // Filter fetched recitations based on the search query
          const filteredRecitations = suwarData.recitations.filter((item) =>
            item.reciter_name?.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // Filter hardcoded recitations based on the search query
          const filterNewData = NewData.recitations.filter((item) =>
            item.reciter_name?.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // Combine both arrays and remove duplicates by checking reciter_name
          const combinedData = [...filteredRecitations, ...filterNewData];

          // Filter out duplicates based on reciter_name
          const uniqueRecitations = combinedData.filter(
            (recitation, index, self) =>
              index ===
              self.findIndex((r) => r.reciter_name === recitation.reciter_name)
          );

          // Set the unique recitations data
          setFilteredData(uniqueRecitations);
        })
        .catch((error) => {
          console.error("Error fetching recitations: ", error);
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, [searchQuery]);

  return (
    <Provider>
      <SafeAreaView stickyHeaderIndices={[2]} className=" flex-1  bg-[#191845]">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="  justify-center   relative">
            <Image
              resizeMode="cover"
              className="absolute  w-full h-full "
              source={require("../../../assets/images/quranLogo.png")}
            />

            <TouchableOpacity
              onPress={() => router.navigate("Index")}
              className="rounded-full items-center justify-center mt-10 ml-4  w-10 h-10 bg-[#373597]"
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>

            <LinearGradient
              colors={["transparent", "rgba(25,24,69,0.8)", "rgba(25,24,69,1)"]}
              style={{ width: width, height: height * 0.3 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />

            <View className=" mt-36 p-5 items-center flex-row justify-between">
              <View className=" items-start w-[239px]">
                <Text
                  numberOfLines={1}
                  className="text-white font-bold  text-xl "
                >
                   {chapter_arab} 
                </Text>
                <Text className=" text-gray-300 text-sm">
                  Chapter {Chapterid}/114
                </Text>
              </View>

              <View className="flex-row items-center justify-center gap-x-5">
                <TouchableOpacity>
                  <FontAwesome name="random" size={24} color="#00D1FF" />
                </TouchableOpacity>

                <TouchableOpacity className="rounded-full items-center justify-center   w-12 h-12 bg-[#373597]">
                  <Entypo name="controller-play" size={24} color="#00D1FF" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row justify-between items-center max-h-10  px-4 mb-6">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleButtonPress("button1")}
                className=" justify-center items-center  "
              >
                <Text className="text-gray-400  mb-3 ">Listen</Text>
                <View
                  style={[{ backgroundColor: getBackgroundColor("button1") }]}
                  className="  w-28 h-[1px] rounded  "
                ></View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleButtonPress("button2")}
                className=" justify-center items-center  "
              >
                <Text className="text-gray-400  mb-3 ">Details</Text>
                <View
                  style={[{ backgroundColor: getBackgroundColor("button2") }]}
                  className="  w-28 h-[1px] rounded  "
                ></View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleButtonPress("button3")}
                className=" justify-center items-center  "
              >
                <Text className="text-gray-400  mb-3 ">Read</Text>
                <View
                  style={[{ backgroundColor: getBackgroundColor("button3") }]}
                  className="  w-28 h-[1px] rounded  "
                ></View>
              </TouchableOpacity>
            </View>
          </View>

          {activeButton === "button1" && (
            <Listen
              chapterName={chapter_arab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredData={filteredData}
              title="Chapter or Reciter..."
              Chapterid={Chapterid}
              info={chapterInfo.short_text}
              quranData={quranData}
            />
          )}

          {activeButton === "button2" && (
            <Details info={chapterInfo.short_text} />
          )}

          {activeButton === "button3" && <Read />}
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default Readers;
