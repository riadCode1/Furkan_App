import {
  View,
  Text,
  Image,
  TouchableOpacity,
  
} from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { fetChapterID } from "../app/API/QuranApi";
import { dataArray } from "@/constants/RecitersImages";
import { router } from "expo-router";

const BottomBar = ({
  playing,
  chapterId,
  setModalVisible,
  pauseAudio,
  name,
  reciterAR,
  arabicCH,
  languages,
  idReader,
}) => {
  
 
  useEffect(() => {
    
  }, [chapterId,languages]);

  
  
  return (
    <TouchableOpacity
    activeOpacity={1}
      onPress={()=>setModalVisible(true)}
      className="w-[95%] absolute bottom-20 flex-row  justify-between  border-t mb-2 border-cyan-400 self-center h-[60px] rounded bg-[#373597] "
    >
      <View className="flex-row overflow-hidden ">
        <View className=" w-[60px] h-[60px]">
          <Image
            className=" w-full h-full "
            source={{
              uri: dataArray[idReader]?.image
                ? dataArray[idReader]?.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCTMhnLo43ZCkuSoHwfvO8sj3nLMJLU9_EA&s",
            }}
          />
        </View>

        <View className=" ml-4 mt-2 ">
          <Text className="text-base text-white font-[600]">
           {languages?arabicCH:chapterId}
          </Text>
          <Text className="text-gray-400 text-xs"> {languages?reciterAR:name} </Text>
        </View>
      </View>

      <TouchableOpacity
      activeOpacity={0.7}
        onPress={pauseAudio}
        className="rounded-full self-center justify-center mr-4    bg-[#373597]"
      >
        {playing ? (
          <FontAwesome5 name="pause" size={24} color="#00D1FF" />
        ) : (
          <FontAwesome5 name="play" size={24} color="#00D1FF" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default (BottomBar);
