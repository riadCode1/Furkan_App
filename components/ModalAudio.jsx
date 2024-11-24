import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import Slider from "@react-native-community/slider";
import { values } from "lodash";

const ModalAudio = ({nextSurah, previousSurah,}) => {




  const { setModalVisible, chapterId,setPosition,duration,
    position, reciter, reciterAR,isPlaying, languages,pauseAudio,idReader,arabicCH } = useGlobalContext();
    console.log(idReader)

    useEffect(() => {
      
    }, [reciter,languages])
    
  const formatTime = (millis) => {
    const hours = Math.floor(millis / 3600000); // Convert to hours
    const minutes = Math.floor((millis % 3600000) / 60000); // Calculate remaining minutes
    const seconds = Math.floor((millis % 60000) / 1000); // Calculate remaining seconds
    
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSliderChange = (value) => {
    // Implement seeking to the new position
    // For example, you could pass the value (which represents the position) to your audio player component to update it
    // For now, we'll assume a function `seekAudioTo` exists to handle this.
    setPosition(value);
  };

  // useEffect(() => {
  //   // If necessary, you can update state or handle side effects based on the position
  // }, [position]);

  return (
    <View className="flex-1 px-2 mt-4 bg-[#191845]">
      <View className=" justify-center">
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          </TouchableOpacity>

          <Entypo name="plus" size={24} color="white" />
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>

        <View className="items-center  mt-[30px]">
          <View className="rounded-md overflow-hidden border-2 border-[#00D1FF] w-[90%] h-[294px] items-center">
            <Image className="w-full h-full" source={require("../assets/images/moon.png")} />
          </View>
          <View className="items-center mt-6">
            <Text className="text-white text-2xl font-bold">{languages?arabicCH:chapterId}</Text>
            <Text className="text-gray-400 text-base">{languages ? reciterAR : reciter}</Text>
          </View>
        </View>
      </View>



      {/* Progress bar and time display */}
      <View className="items-center mt-5 ">

    {/* Slider for progress */}
    <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={()=>handleSliderChange(position)}
          minimumTrackTintColor="#00D1FF"
          maximumTrackTintColor="#999"
          thumbTintColor="#00D1FF"
        />

   
        <View className="flex-row justify-between px-4 w-full  mt-5">
          <Text className="text-white">{formatTime(position)}</Text>
          <Text className="text-white">{formatTime(duration)}</Text>
        </View>

        
        <View className="flex-row justify-between mt-5 gap-x-9  px-16 items-center">
          <TouchableOpacity activeOpacity={0.7} onPress={previousSurah}>
            <MaterialIcons name="skip-previous" size={40} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={pauseAudio}
            className="bg-[#00D1FF] w-16 h-16 justify-center items-center rounded-full"
          >
            {isPlaying ? <FontAwesome name="pause" size={24} color="white" /> : <FontAwesome name="play" size={24} color="white" />}
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={nextSurah}>
            <MaterialIcons name="skip-next" size={40} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center px-4 w-full mt-4 ">
          <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons name="shuffle" size={30} color="#00D1FF" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons name="repeat" size={30} color="#00D1FF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: "100%",
    
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});

export default ModalAudio;
