import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { dataArray } from "@/constants/RecitersImages";
import { FlashList } from "@shopify/flash-list";
import SearchBar from "@/components/SearchBar";
import { useGlobalContext } from "@/context/GlobalProvider";
import { fetchChater } from "@/app/API/QuranApi";
import SuratReader from "../../../components/SuratReader";
import { fetchAudio } from "../../API/QuranApi";

import ModalAudio from "../../../components/ModalAudio";

let { width, height } = Dimensions.get("window");

const ReaderSurah = () => {
  const params = useLocalSearchParams();
  const { arab_name, name, id } = params;
  const {
    pauseAudio,
    languages,

    soundRef,

    setIsPlaying,
    isPlaying,
    playSound,
    setModalVisible,
    modalVisible,
    position,
    setPosition,
    duration,
    currentTrackId,
    setCurrentTrackId,
    setDuration,
  } = useGlobalContext();

  const [chapters, setchapters] = useState([]);
  const [dataAudio, setDataAudio] = useState([]);
  const [loading, setloading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getChapter();
    fetchAudioUrl(id);

    {
      /*Search QUery */
    }
    if (searchQuery.length > 1) {
      setloading(true);

      fetchChater(searchQuery)
        .then((suwarData) => {
          // Filter fetched recitations based on the search query
          const filteredRecitations = suwarData.chapters.filter((item) =>
            item.name_simple?.toLowerCase().includes(searchQuery.toLowerCase())
          );

          setFilteredData(filteredRecitations);
          console.log("filter", filteredData);
        })
        .catch((error) => {
          console.error("Error fetching recitations: ", error);
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, []);

  {
    /*GetChapter */
  }

  const getChapter = async () => {
    setloading(true); // Set loading to true before fetching
    try {
      const data = await fetchChater();
      // console.log("got Chapter", data.chapters[1].name_arabic);

      if (data && data.chapters) {
        setchapters(data.chapters);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error); // Handle any errors
    } finally {
      setloading(false); // Set loading to false after the fetch attempt
    }
  };

  {
    /*GetAudio */
  }

  const fetchAudioUrl = async () => {
    setloading(true); // Set loading to true before fetching
    try {
      const data = await fetchAudio(id);

      if (data && data.audio_files) {
        setDataAudio(data.audio_files);
      }
      console.log("ch", data);
    } catch (error) {
      console.error("Error fetching chapters:", error); // Handle any errors
    } finally {
      setloading(false); // Set loading to false after the fetch attempt
    }
  };

  // Function to play the next surah
  const nextSurah = () => {
    playSound(
      dataAudio[currentTrackId].audio_url,
      dataAudio[currentTrackId].chapter_id,
      chapters[currentTrackId].name_simple,
      name,
      arab_name,
      id
    );
  };

  const playAuto = () => {
    playSound(dataAudio[0].audio_url, dataAudio[0].chapter_id);
  };

  // Function to play the previous surah
  const previousSurah = async () => {
    playSound(
      dataAudio[currentTrackId - 2].audio_url,
      dataAudio[currentTrackId - 2].chapter_id,
      chapters[currentTrackId - 2].name_simple,
      name,
      arab_name,
      id
    );
  };
  const stopAudio = async () => {
    try {
      if (soundRef.current && soundRef.current._loaded) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      // Reset audio player state
      setIsPlaying(false);
      setPosition(0);
      setDuration(0);
      setCurrentTrackId(null);
    } catch (error) {
      console.error("Error stopping audio:", error);
    }
  };

  return (
    <SafeAreaView className=" flex-1  bg-[#191845]">
      <ScrollView
        stickyHeaderIndices={[1]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="  justify-center   relative">
          <Image
            source={{
              uri: dataArray[id]?.image || dataArray[3]?.image,
            }}
            className="absolute  w-full h-full "
            resizeMode="cover"
          />

          <TouchableOpacity
            activeOpacity={0.7}
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
            <View className=" items-start w-[70%]">
              <Text
                numberOfLines={1}
                className="text-white font-bold  text-xl "
              >
                {languages ? arab_name : name}
              </Text>
              <Text className=" text-gray-300 text-sm">
                114 {languages ? "سورة" : "Surahs"}{" "}
              </Text>
            </View>

            {isPlaying ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={pauseAudio}
                className="rounded-full items-center justify-center   w-12 h-12 bg-[#373597]"
              >
                <FontAwesome5 name="pause" size={20} color="#00D1FF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={playAuto}
                className="rounded-full items-center justify-center   w-12 h-12 bg-[#373597]"
              >
                <Entypo name="controller-play" size={24} color="#00D1FF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className=" py-4 ">
          <SearchBar
            title={languages ? "ابحث عن سورة" : "Search Chapter"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredData={filteredData}
          />
          <View className="  px-4 ">
            <Text className="text-gray-500 text-lg font-normal">
              {" "}
              {languages ? "تلاوة سورة" : "Recite Chapter"} :
            </Text>
          </View>
        </View>

        {searchQuery.length > 1 ? (
          <FlashList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={filteredData}
            estimatedItemSize={50}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <SuratReader
                  chapteID={item.id}
                  id={id}
                  setIsPlaying={setIsPlaying}
                  dataAudio={dataAudio}
                  arab_name={arab_name}
                  reciterName={name}
                  chapterName={item.name_simple}
                  chapterAr={item.name_arabic}
                  playSound={playSound}
                />
              </View>
            )}
          />
        ) : (
          <FlashList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={chapters}
            estimatedItemSize={50}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <SuratReader
                  chapteID={item.id}
                  id={id}
                  setIsPlaying={setIsPlaying}
                  dataAudio={dataAudio}
                  reciterName={name}
                  arab_name={arab_name}
                  chapterAr={item.name_arabic}
                  chapterName={item.name_simple}
                  playSound={playSound}
                />
              </View>
            )}
          />
        )}
      </ScrollView>

      {/* Modal */}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
             onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
          visible={modalVisible}
        
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ModalAudio
                duration={duration}
                position={position}
                setPosition={setPosition}
                nextSurah={nextSurah}
                previousSurah={previousSurah}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    height: "100%",
    width: "100%",
  },
  modalView: {
    height: "100%",
    width: "100%",
    backgroundColor: "#191845",
  },
});

export default ReaderSurah;
