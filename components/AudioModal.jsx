import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { memo, useEffect, useState } from "react";
import {
  MaterialIcons,
  Entypo,

  FontAwesome6,
  FontAwesome,
} from "@expo/vector-icons/";

import Slider from "@react-native-community/slider";
import { fetChapterID } from "../app/API/QuranApi";
import { useGlobalContext } from "@/context/GlobalProvider";

const AudioModal = ({
  setModalVisible,
  name,
  duration,
  idAudio,
  position,
  pauseAudio,
  currentSound,
  isPlaying,
  arab_name,
  chapter,
  nextSurah,
  previousSurah,
}) => {
  // Convert to an integer

  const [chapterID, setchapterID] = useState({});

  const {
    setLanguages,languages
  } = useGlobalContext();

  useEffect(() => {
    getChapterID();
  }, [idAudio,chapter,duration,position]);
  console.log(duration)

  

  const getChapterID = async (id) => {
    const data = await fetChapterID(chapter);
    //console.log("chapter", data.chapter);
    if (data && data.chapter) setchapterID(data.chapter);
  };

  const formatTime = (millis) => {
    const hours = Math.floor(millis / 6000000);
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${hours}:${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View className="py-20 mx-4 justify-center ">
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
        </TouchableOpacity>

        <Entypo name="plus" size={24} color="white" />
        <Entypo name="dots-three-vertical" size={24} color="white" />
      </View>

      <View className="items-center mt-[30px]">
        <View className=" rounded-md overflow-hidden border-2  border-[#00D1FF] w-[90%] h-[294px] items-center ">
          <Image
            className="w-full h-full"
            source={require("../assets/images/moon.png")}
          />
        </View>
        <View className="items-center mt-6">
          <Text className="text-white text-2xl font-bold">
          {languages?chapterID.name_arabic:chapterID.name_simple}
          </Text>
          <Text className="text-gray-400 text-base">{languages?arab_name:name}</Text>
        </View>
      </View>

      {/* slide bar*/}
      <View className=" items-center">

      {/* <Sliders
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        step={1}
        value={position}
        onValueChange={""}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1EB1FC"
      /> */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          
          maximumValue={duration || 1} // Prevent NaN or zero division by setting a default
          value={position}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="white"
          
          
          onSlidingComplete={async (value) => {
            if (currentSound) {
              await currentSound.setPositionAsync(value);
            }
          }}
        />
        <View className="flex-row justify-between w-full px-2 mt-8">
          <Text className="text-white">{formatTime(position)} </Text>
          <Text className="text-white">{formatTime(duration)}</Text>
        </View>

        <View className="flex-row justify-between w-[375] px-16  items-center">
          <TouchableOpacity  activeOpacity={0.7} onPress={previousSurah}>
            <MaterialIcons name="skip-previous" size={40} color="white" />
          </TouchableOpacity>


            
          <TouchableOpacity activeOpacity={0.7}
            onPress={pauseAudio}
            className="bg-[#00D1FF] w-16 h-16 justify-center items-center  rounded-full"
          >
            {isPlaying? (
               <FontAwesome name="pause" size={24} color="white" />
            ) :(
              <FontAwesome name="play" size={24} color="white" />
            )}
           
            
          </TouchableOpacity>

          <TouchableOpacity  activeOpacity={0.7} onPress={nextSurah}>
            <MaterialIcons name="skip-next" size={40} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center w-[300px] ">
          <TouchableOpacity  activeOpacity={0.7}>
            <Entypo name="shuffle" size={24} color="#00D1FF" />
          </TouchableOpacity>

          <TouchableOpacity  activeOpacity={0.7}>
            <FontAwesome6 name="repeat" size={24} color="#00D1FF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: "100%",
    height: 40,
   
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});

export default memo(AudioModal);
