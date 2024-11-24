import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Dropmenu from "./Dropmenu";
import { AntDesign } from "@expo/vector-icons";

import { dataArray } from "../constants/RecitersImages";
import { useGlobalContext } from "../context/GlobalProvider";

const ChapterReadre = ({
  playSound,
  chapterAr,
  arab_name,
  name,
  Chapterid,
  IdReciter,
  chapterName,
  Audio,
  setRead,
  read,
  setAudio,
  handleReciterSelect,
  
}) => {

  const {
    
    
    idReader
  } = useGlobalContext();

  
//   const generateRandomNumber = () => Math.floor(Math.random() * 20) +1; // Random number between 1 and 20
//   const Id = generateRandomNumber();
//   const recitePlus = Id + 1;
//   const reciteMinus = Id + 1;

//   const [recite, setRecite] = useState(null);
// console.log("read" ,idReader)
 
//   const handlePlay=()=>{
//     playSound(chapterAudio,Chapterid,chapterName,name,arab_name,IdReciter)
    

   
    
// }
  
  
  const {languages} = useGlobalContext();

  // useEffect(() => {
  //   getAudio();
  //   getAudioPlus()
  //   getAudioMinus()
  // }, [idReader,read]);


  // const [chapterAudio, setAudioChapter] = useState([]);

  // const getAudio = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.quran.com/api/v4/chapter_recitations/${IdReciter}/${Chapterid}`
  //     );
  //     const data = await response.json();
  //     setRead(idReader)
  //     console.log(idReader)
  //     setAudioChapter(data?.audio_file?.audio_url);
      
    

      
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching audio URL:", error);
  //   }
  // };

  // const getAudioPlus = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.quran.com/api/v4/chapter_recitations/${read}/${Chapterid}`
  //     );
  //     const data = await response.json();
      
    
  //     setAudio(data?.audio_file?.audio_url);
     
    

      
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching audio URL:", error);
  //   }
  // };

  // const getAudioMinus = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.quran.com/api/v4/chapter_recitations/${reciteMinus}/${Chapterid}`
  //     );
  //     const data = await response.json();
      
  //     setAudio(data?.audio_file?.audio_url);
      
    

      
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching audio URL:", error);
  //   }
  // };


  return (
    <View className=" flex-row w-full items-center justify-between px-4  py-2  ">
      <TouchableOpacity
        onPress={()=>handleReciterSelect(IdReciter)}
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
          <Text className="text-white font-bold text-base">
            {languages?arab_name:name}
            </Text>

          <Text numberOfLines={1} className=" text-gray-400 text-xs">
               {languages?chapterAr:chapterName}
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
  );
};

export default ChapterReadre;
