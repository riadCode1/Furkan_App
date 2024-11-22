import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, {  useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Dropmenu from "./Dropmenu";
import { dataArray } from "@/constants/RecitersImages";
import { useGlobalContext } from "@/context/GlobalProvider";

const SuratReader = ({setIsPlaying,chapterName,languages,chapterAr,reciterName,arab_name,playSound,dataAudio,chapteID,id}) => {

 

const handlePlay=()=>{
  playSound(dataAudio[chapteID-1]?.audio_url,chapteID,chapterName,reciterName,arab_name,id)
 
}
 
  

  return (
    <View
       
      className=" flex-row w-full items-center justify-between px-4  py-2  "
    >
      <TouchableOpacity
        onPress={handlePlay}
        activeOpacity={0.7}
        className="gap-x-3  w-[80%] flex-row"
      >
        <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
          <Image
            resizeMode="contain"
            className=" w-full h-full overflow-hidden"
            source={{
              uri: dataArray[id]?.image
                ? dataArray[id]?.image
                : dataArray[3]?.image,
            }}
          />
        </View>

        <View className="  items-start">
          <Text className="text-white font-bold text-base">
            {languages?chapterAr:chapterName}
            
          </Text>

          <Text numberOfLines={2} className=" text-gray-400 text-xs">
            
          {languages ? arab_name : reciterName}
          </Text>
        </View>
      </TouchableOpacity>

      <View className="flex-row gap-x-[30px] mr-3 justify-center items-center">
        <TouchableOpacity>
          <AntDesign name="download" size={24} color="white" />
        </TouchableOpacity>
        <View className=" w-0 ">
          <Dropmenu
             chapter={chapterName}
             reciterName={reciterName}
              reciterID={id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Color: {
    backgroundColor: "#373597",
  },
});

export default (SuratReader);
