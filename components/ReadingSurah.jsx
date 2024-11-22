import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

const ReadingSurah = ({chapter_arab,arab_name,languages, name, Chapterid }) => {
  const [play, setplay] = useState(false);

  const handleNavigate = () => {
    router.push({ pathname: `Readers`, params: {chapter_arab,arab_name, name, Chapterid } });
    console.log("suwar", Chapterid);
  };

  return (
    <TouchableOpacity
    activeOpacity={0.7}
      onPress={handleNavigate}
      className=" mr-[12px] w-[104px]   "
    >
      <View className="w-[104px] h-[104px] rounded-lg overflow-hidden ">
        <Image
          className="w-full h-full overflow-hidden"
          resizeMode="contain"
          source={require("../assets/images/quranLogo.png")}
        />
      </View>

      <View className=" mt-2">
        <Text className=" text-white  text-sm font-[700] ">{languages?chapter_arab:name} </Text>
        <Text numberOfLines={2} className=" text-gray-500  text-xs">
          {languages?"السورة":"chapter"}  {Chapterid}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default ReadingSurah;
