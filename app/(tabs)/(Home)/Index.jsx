import {
  View,
  Text,
 
  Platform,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import ReaderCard from "../../../components/ReaderCard";
import { SafeAreaView } from "react-native-safe-area-context";
import ReadingSurah from "../../../components/ReadingSurah";
import { fetchChater, fetchSuwar } from "../../API/QuranApi";
import { NewData } from "../../../constants/NewData";
import { useGlobalContext } from "@/context/GlobalProvider";



const Index = () => {

  const [quranData, setQuranData] = useState([]);
  const [chapter, setchapter] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    setLanguages,
    languages,
  } = useGlobalContext();
 
  
 
  
  useEffect(() => {
    getReciter();
    getChapter();
  }, [languages]);

  const getReciter = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const data = await fetchSuwar();
      // console.log("got reciter", data.recitations);
      
      if (data && data.recitations) {
        const combinedData = [...data.recitations, ...NewData.recitations];  // Concatenate API data with hardcoded data
        setQuranData(combinedData);  // Set the concatenated data to state
        console.log("com", combinedData);
      }
    } catch (error) {
      console.error("Error fetching recitations:", error); // Handle any errors
    } finally {
      setLoading(false); // Set loading to false after the fetch attempt
    }
  };
  
  const getChapter = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const data = await fetchChater();
      // console.log("got Chapter", data.chapters);
      
      if (data && data.chapters) {
        setchapter(data.chapters);
      }
      console.log("ch", chapter);
    } catch (error) {
      console.error("Error fetching chapters:", error); // Handle any errors
    } finally {
      setLoading(false); // Set loading to false after the fetch attempt
    }
  };
  

  

  

  return (
    <SafeAreaView className="flex-1   bg-[#191845] ">
      <ScrollView contentContainerStyle={{paddingBottom:200}}>

      
      {/*Top*/ }

      <View className="flex-row justify-between px-4 mt-5 items-center">
        <View className="flex-row items-center">
          <Image
            className="w-12 h-12"
            source={require("../../../assets/images/Logo.png")}
          />
          <Text className=" text-[#01F4FF] text-lg font-bold">Furqan </Text>
        </View>

        <TouchableOpacity className="bg-[#373597] p-2 rounded-full items-center justify-center">
          <Feather name="cast" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/*Listen */}

      <View className="mt-10 ml-4">
        <Text className="text-white font-bold text-2xl mb-4 pr-4">
            {languages? "استمع للقرآن الكريم من ":"Listen to Quran by"}
        </Text>

{loading? (
  <Text>Loading</Text>
):(


 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quranData?.slice(2,8).map((item) => (
            <ReaderCard
              key={item.index}
              item={item}
              languages={languages}
              setLanguages={setLanguages}
              name={item.reciter_name}
              arab_name={item.translated_name.name}
              id={item.id}
            />
          ))}
        </ScrollView>
)}
       
      </View>

      <View className="mt-[48px] ml-4 ">
        <Text className="text-white font-bold text-2xl pr-4 mb-[16px]">
           {languages?"أفضل سور القرآن الكريم":"Best Quran Chapters"}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {chapter?.slice(2, 8).map((item) => (
            <ReadingSurah
              key={item.index}
              item={item}
              languages={languages}
              name={item.name_simple}
              arab_name={item.translated_name.name}
              chapter_arab={item.name_arabic}
              Chapterid={item.id}
            />
          ))}
        </ScrollView>
      </View>
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
