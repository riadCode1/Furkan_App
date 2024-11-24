import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import ChapterReadre from "./ChapterReadre";
import { useGlobalContext } from "../context/GlobalProvider";

import SearchBar from "./SearchBar";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import ModalAudio from "./ModalAudio";
import Dropmenu from "./Dropmenu";
import { AntDesign } from "@expo/vector-icons";
import { dataArray } from "../constants/RecitersImages";

const Listen = ({
  searchQuery,
  setSearchQuery,
  filteredData,
  title,
  chapterAr,
  quranData,
  Chapterid,
  name,
  chapterName,
}) => {
  const [Audio, setAudio] = useState([]);
 
  const [IdReciter, setIdReciter] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  

 

 

  const {
    setReciterAR,

    soundRef,

    languages,
    currentTrackId,
    setCurrentTrackId,
    setChapterID,
    setIDreader,
    setReciter,
    isPlaying,
    idReader,
    setIsPlaying,
    setPosition,
    setDuration,
    duration,
    position,
    modalVisible,
    setModalVisible,
  } = useGlobalContext();

  // Fetch audio URL based on reciter ID
  const getAudio = async (reciterId) => {
    try {
      const response = await fetch(
        `https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${Chapterid}`
      );
      const data = await response.json();
      setAudioUri(data?.audio_file?.audio_url);
      return data?.audio_file?.audio_url; // Return the audio URL
    } catch (error) {
      console.error("Error fetching audio URL:", error);
    }
  };

  // Handle reciter selection
  const handleReciterSelect = async (reciterId) => {
    setIdReciter(reciterId);

    const uri = await getAudio(reciterId);
  
      playSound(
        uri,
        Chapterid,
        chapterName,
        quranData.find((r) => r.id === reciterId)?.reciter_name,
        quranData.find((r) => r.id === reciterId)?.translated_name.name,
        reciterId
      );
      
    
  };

  

  // Navigate to the next reciter
  const handleNextReciter = async () => {
    const currentIndex = quranData.findIndex((r) => r.id === IdReciter);
    const nextIndex = (currentIndex+1 ) % quranData.length; // Loop back to the start
    const nextReciterId = quranData[nextIndex].id;
    await handleReciterSelect(nextReciterId);
  };

  // Navigate to the previous reciter
  const handlePreviousReciter = async () => {
    const currentIndex = quranData.findIndex((r) => r.id === IdReciter);
    const previousIndex =
      (currentIndex - 1 + quranData.length) % quranData.length; // Loop back to the end
    const previousReciterId = quranData[previousIndex].id;
    await handleReciterSelect(previousReciterId);
  };

  const playSound = async (uri, trackId, chapterName, name, arabName, id) => {
    try {
      if (soundRef.current._loaded) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      await soundRef.current.loadAsync({ uri });
      await soundRef.current.playAsync();

      // Set the current index in the list

      soundRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
    setCurrentTrackId(trackId);
    setChapterID(chapterName);
    setIsPlaying(true);
    setReciter(name);
    setIDreader(id);
    setReciterAR(arabName);
  };

  // Function to handle playback status updates
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);

      // Check if the audio has finished playing
      if (status.didJustFinish) {
        handleNextReciter();
      }
    }
  };

  // play on the Background
  useEffect(() => {
    const setupAudioMode = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });
    };

    setupAudioMode();
  }, [searchQuery]);

  return (
    <View>
      <View className="items-center">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredData={filteredData}
          title="Chapter or Reciter..."
        />
      </View>

      <View className="px-4 mt-8">
        <Text className="text-gray-500 text-lg font-normal"> Recited By</Text>
      </View>

      {searchQuery.length > 1 ? (
        <FlashList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={filteredData}
          estimatedItemSize={50}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className=" flex-row w-full items-center justify-between px-4  py-2  ">
              <TouchableOpacity
                onPress={() => handleReciterSelect(item.id)}
                activeOpacity={0.7}
                className="gap-x-3 flex-row"
              >
                <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
                  <Image
                    resizeMode="contain"
                    className=" w-full h-full overflow-hidden"
                    source={{
                      uri: dataArray[item.id]?.image
                        ? dataArray[item.id]?.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCTMhnLo43ZCkuSoHwfvO8sj3nLMJLU9_EA&s",
                    }}
                  />
                </View>

                <View className="  items-start">
                  <Text className="text-white font-bold text-base">
                    {languages ? item.translated_name.name : item.reciter_name}
                  </Text>

                  <Text numberOfLines={1} className=" text-gray-400 text-xs">
                    {languages ? chapterAr : chapterName}
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="flex-row gap-x-[30px] mr-3 justify-center items-center">
                <TouchableOpacity activeOpacity={0.7}>
                  <AntDesign name="download" size={24} color="white" />
                </TouchableOpacity>
                <View className=" w-0 ">
                  <Dropmenu />
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <FlashList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={quranData}
          estimatedItemSize={150}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <View className=" flex-row w-full items-center justify-between px-4  py-2  ">
                <TouchableOpacity
                  onPress={() => handleReciterSelect(item.id)}
                  activeOpacity={0.7}
                  className="gap-x-3 flex-row"
                >
                  <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
                    <Image
                      resizeMode="contain"
                      className=" w-full h-full overflow-hidden"
                      source={{
                        uri: dataArray[item.id]?.image
                          ? dataArray[item.id]?.image
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCTMhnLo43ZCkuSoHwfvO8sj3nLMJLU9_EA&s",
                      }}
                    />
                  </View>

                  <View className="  items-start">
                    <Text className="text-white font-bold text-base">
                      {languages
                        ? item.translated_name.name
                        : item.reciter_name}
                    </Text>

                    <Text numberOfLines={1} className=" text-gray-400 text-xs">
                      {languages ? chapterAr : chapterName}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View className="flex-row gap-x-[30px] mr-3 justify-center items-center">
                  <TouchableOpacity activeOpacity={0.7}>
                    <AntDesign name="download" size={24} color="white" />
                  </TouchableOpacity>
                  <View className=" w-0 ">
                    <Dropmenu />
                  </View>
                </View>
              </View>
            </>
          )}
        />
      )}

      {/* Modal */}

      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ModalAudio
                duration={duration}
                position={position}
                setPosition={setPosition}
                nextSurah={handleNextReciter}
                previousSurah={handlePreviousReciter}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
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

export default Listen;
