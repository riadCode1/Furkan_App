import {
  View,
  Text,
  ImageBackground,
 
  Platform,
  Dimensions,
  
  Image,
  TouchableOpacity,
 
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { fetchChater, fetchSearch, fetchSuwar } from "../API/QuranApi";

import Dropmenu from "@/components/Dropmenu";
import { router } from "expo-router";

import { dataArray } from "@/constants/RecitersImages";
import {NewData} from "../../constants/NewData"

const Ios = Platform.OS == "ios";
let { width, height } = Dimensions.get("window");

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [currentSound, setCurrentSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      setloading(true);

      // Fetch both chapters and recitations at the same time
      Promise.all([fetchChater(searchQuery), fetchSuwar(searchQuery)])
        .then(([chapterData, suwarData]) => {
          // Filter chapters
          const filteredChapters = chapterData.chapters.filter(
            (item) =>
              item.name_simple
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item.name_arabic
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
          );

          // Filter recitations

          const combinedRecitations = [
            ...suwarData.recitations,
            ...NewData.recitations,
          ]; // Combine API data with hardcoded data

          const filteredRecitations = combinedRecitations.filter((item) =>
            item.reciter_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.translated_name.name?.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // Combine results from both into filteredData
          setFilteredData([...filteredChapters, ...filteredRecitations]);
        })

        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          setloading(false);
        });
    }
    console.log("data", filteredData);
  }, [searchQuery]);

  const handlePress = (item) => {
    if (item.name_simple) {
      router.push({
        pathname: `/Readers/`,
        params: { Chapterid: item.id, chapter_arab:item.name_arabic, name: item.name_simple },
      });
      console.log("Moratilii", item);
    } else if (item.reciter_name) {
      router.push({
        pathname: `/ReaderSurah/`,
        params: { id: item.id, name: item.reciter_name },
      });
      
    }
  };

  return (
    <SafeAreaView className=" items-center flex-1   py-[55px] bg-[#191845] ">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredData={filteredData}
        title="Chapter or Reciter..."
      />

      {/* results */}

      {searchQuery.length > 1 ? (
        <View className=" mt-4 rounded  ">
          <Text className="text-white">Results: {filteredData?.length}</Text>

          <FlatList
            contentContainerStyle={{ paddingBottom: 200 }}
            scrollIndicatorInsets={false}
            data={filteredData}
            renderItem={({ item }) => (
              <View>
                <View className=" flex-row w-full items-center justify-between px-4  py-2  ">
                  <TouchableOpacity
                    onPress={() => handlePress(item)}
                    activeOpacity={0.7}
                    className="gap-x-3 flex-row"
                  >
                    <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
                      {item.name_simple ? (
                        <Image
                          resizeMode="contain"
                          className=" w-full h-full overflow-hidden"
                          source={require("../../assets/images/quranLogo.png")}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          className=" w-full h-full overflow-hidden"
                          source={{
                            uri: dataArray[item.id - 1]?.image
                              ? dataArray[item.id]?.image
                              : dataArray[11]?.image,
                          }}
                        />
                      )}
                      <Image
                        resizeMode="contain"
                        className=" w-full h-full overflow-hidden"
                        source={{
                          uri: dataArray[item.id - 1]?.image
                            ? dataArray[item.id]?.image
                            : dataArray[11]?.image,
                        }}
                      />
                    </View>

                    <View className="  items-start">
                      <Text
                        numberOfLines={1}
                        className="text-white font-bold text-base"
                      >
                        {item.name_simple}
                        {item?.reciter_name?.length > 10
                          ? item.reciter_name.slice(0, 20) + "..."
                          : item.reciter_name}
                      </Text>

                      <Text className="text-white font-bold text-sm">
                        {item.name_arabic || item.translated_name.name}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View className="flex-row gap-x-[30px] mr-3 justify-center items-center">
                    <View className=" w-0 ">
                      <Dropmenu />
                    </View>
                  </View>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View classNam="  ">
          <View className="flex-row justify-between px-4  mt-[80px]">
            {/*Chapters*/}

            <TouchableOpacity
              style={{ width: width * 0.45 }}
              className=" w-[168px] h-[104px]  rounded-md overflow-hidden"
            >
              <ImageBackground
                resizeMode="cover"
                source={require("../../assets/images/quran.png")}
                className="w-full overflow-hidden h-full "
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#FF3597", "rgba(0,0,0,0.1)", "transparent"]}
                  className="absolute right-0 left-0 top-0 h-64"
                >
                  <Text
                    style={{ fontSize: width * 0.06 }}
                    className=" m-2 font-bold text-2xl text-white"
                  >
                    Chapters
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>

            {/*recitation*/}

            <TouchableOpacity
              style={{ width: width * 0.45 }}
              className=" rounded-md overflow-hidden"
            >
              <ImageBackground
                resizeMode="cover"
                source={require("../../assets/images/recitation.png")}
                className="w-full overflow-hidden h-[104px] "
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#FF3514", "rgba(0,0,0,0.1)", "transparent"]}
                  className="absolute right-0 left-0 top-0 h-64"
                >
                  <Text
                    style={{ fontSize: width * 0.06 }}
                    className=" m-2 font-bold text-2xl text-white"
                  >
                    Recitations
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center w-full px-4  mt-4">
            {/*reciters*/}

            <TouchableOpacity
              style={{ width: width * 0.45 }}
              className="  rounded-md overflow-hidden"
            >
              <ImageBackground
                resizeMode="cover"
                source={require("../../assets/images/reciters.png")}
                className="w-full overflow-hidden h-[104px] "
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#1464FF", "rgba(0,0,0,0.1)", "transparent"]}
                  className="absolute right-0 left-0 top-0 h-64"
                >
                  <Text
                    style={{ fontSize: width * 0.06 }}
                    className=" m-2 font-bold text-2xl text-white"
                  >
                    Reciters
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>

            {/*makah*/}

            <TouchableOpacity
              style={{ width: width * 0.45 }}
              className=" rounded-md overflow-hidden"
            >
              <ImageBackground
                resizeMode="cover"
                source={require("../../assets/images/mekah.png")}
                className="w-full overflow-hidden h-[104px] "
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#14F1FF", "rgba(0,0,0,0.1)", "transparent"]}
                  className="absolute right-0 left-0 top-0 h-64"
                >
                  <Text
                    style={{ fontSize: width * 0.06 }}
                    className=" m-2 font-bold text-2xl text-white"
                  >
                    Live Makah & Madinah
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
