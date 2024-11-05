import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Dropmenu from "./Dropmenu";
import { AntDesign } from "@expo/vector-icons";

import { dataArray } from "../constants/RecitersImages";

const ChapterReadre = ({
  playSound,
 
  arab_name,
  name,
  Chapterid,
  IdReciter,
  chapterName,
}) => {
  
  

  useEffect(() => {
    getAudio();
  }, []);


  const [chapterAudio, setAudioChapter] = useState([]);

  const getAudio = async (id) => {
    try {
      const response = await fetch(
        `https://api.quran.com/api/v4/chapter_recitations/${IdReciter}/${Chapterid}`
      );
      const data = await response.json();
      console.log("data", data);
      setAudioChapter(data);
      
    

      // Get the audio for the first ayah in the Surah
      return data;
    } catch (error) {
      console.error("Error fetching audio URL:", error);
    }
  };


  return (
    <View className=" flex-row w-full items-center justify-between px-4  py-2  ">
      <TouchableOpacity
        onPress={()=> playSound(chapterAudio.audio_file.audio_url,Chapterid,name,IdReciter)}
        activeOpacity={0.7}
        className="gap-x-3 flex-row"
      >
        <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
          <Image
            resizeMode="contain"
            className=" w-full h-full overflow-hidden"
            source={{
              uri: dataArray[IdReciter]?.image
                ? dataArray[IdReciter]?.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCTMhnLo43ZCkuSoHwfvO8sj3nLMJLU9_EA&s",
            }}
          />
        </View>

        <View className="  items-start">
          <Text className="text-white font-bold text-base">{arab_name}</Text>

          <Text numberOfLines={1} className=" text-gray-400 text-xs">
            {chapterName}
          </Text>
        </View>
      </TouchableOpacity>

      <View className="flex-row gap-x-[30px] mr-3 justify-center items-center">
        <TouchableOpacity>
          <AntDesign name="download" size={24} color="white" />
        </TouchableOpacity>
        <View className=" w-0 ">
          <Dropmenu />
        </View>
      </View>
    </View>
  );
};

export default ChapterReadre;
