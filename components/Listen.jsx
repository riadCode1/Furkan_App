import { View, Text, StyleSheet,  } from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import ChapterReadre from "./ChapterReadre";
import { useGlobalContext } from "../context/GlobalProvider";

import SearchBar from "./SearchBar";
import {Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

const Listen = ({
  searchQuery,
  setSearchQuery,
  filteredData,
  title,
  quranData,
  Chapterid,
  name,
  chapterName,
}) => {
  
  

  

  const {
    setModalVisible,
    modalVisible,
    duration,
     setDuration,
    reciter,
    currentTrackId,
    setCurrentTrackId,
    soundRef,
    SetBar,
    position,
     setPosition,
    pauseAudio,
    setChapterID,
    setIDreader,
    setReciter,
    isPlaying,
    setIsPlaying,
  } = useGlobalContext();

 
  const playSound = async (uri, trackId, names, IdReciter) => {
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
    setIsPlaying(true);
    SetBar(true);
    setIDreader(IdReciter)
    setReciter(names);

    setChapterID(Chapterid);
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
  }, []);

  // Function to handle playback status updates
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);

      // Check if the audio has finished playing
      if (status.didJustFinish) {
        nextSurah();
      }
    }
  };

  // Function to pause audio

  // Function to play the next surah
  const nextSurah = () => {
    playSound();
  };

  // Function to play the previous surah
  const previousSurah = async () => {
    playSound(
      data[currentTrackId - 2].audio_url,
      data[currentTrackId - 2].chapter_id
    );
  };

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
          estimatedItemSize={100}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ChapterReadre
              className="text-white"
              name={item.reciter_name}
              arab_name={item.translated_name.name}
              IdReciter={item.id}
              Chapterid={Chapterid}
              playSound={playSound}
              chapterName={chapterName}
            />
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
              <ChapterReadre
                className="text-white"
                name={item.reciter_name}
                IdReciter={item.id}
                arab_name={item.translated_name.name}
                Chapterid={Chapterid}
                playSound={playSound}
                chapterName={chapterName}
              />
            </>
          )}
        />
      )}

      {/* Modal */}

      
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
