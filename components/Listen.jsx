import { View, Text, StyleSheet, Modal, Alert,  } from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import ChapterReadre from "./ChapterReadre";
import { useGlobalContext } from "../context/GlobalProvider";

import SearchBar from "./SearchBar";
import {Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import ModalAudio from "./ModalAudio";

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
  const [read, setRead] = useState(1);

  

  const {
    
    
    
    setReciterAR,
    
    soundRef,
    
    playSound,
    currentTrackId,
     setCurrentTrackId,
    setChapterID,
    setIDreader,
    setReciter,
    isPlaying,
    setIsPlaying,
    setPosition,
    setDuration,
    duration,
    position,
    modalVisible,
    setModalVisible
  } = useGlobalContext();

  
  console.log("url",Audio)

  

 
  // play on the Background
  useEffect(() => {
   
  }, [searchQuery]);

  


  // Function to play the next surah
  const nextSurah = () => {
    playSound(Audio,Chapterid,chapterName,name,"arab_name","IdReciter");
  };

  // Function to play the previous surah
  const previousSurah = async () => {
    playSound(Audio,Chapterid,chapterName,name,"arab_name","IdReciter");
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
          estimatedItemSize={50}
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
              chapterAr={chapterAr}
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
                Audio={Audio}
                setAudio={setAudio}
                setCurrentTrackId={setCurrentTrackId}
                arab_name={item.translated_name.name}
                Chapterid={Chapterid}
                playSound={playSound}
                chapterName={chapterName}
                chapterAr={chapterAr}
              />
            </>
          )}
        />
      )}

      {/* Modal */}
      

     <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
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
