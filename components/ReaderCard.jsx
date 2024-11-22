import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { router, usePathname } from "expo-router";

import { dataArray } from "../constants/RecitersImages";

const ReaderCard = ({ arab_name, languages, item, name, id }) => {
  const handleNavigate = () => {
    router.push({ pathname: `/ReaderSurah/`, params: { arab_name, name, id } });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleNavigate}
      className=" mr-[12px] w-[104px]   "
    >
      <View className="w-[104px] rounded-md h-[104px] overflow-hidden ">
        <Image
          className="w-full h-full overflow-hidden"
          resizeMode="cover"
          source={{
            uri: dataArray[id]?.image
              ? dataArray[id]?.image
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCTMhnLo43ZCkuSoHwfvO8sj3nLMJLU9_EA&s",
          }}
        />
      </View>

      <View className=" mt-2">
        <Text className=" text-gray-400  text-xs ">
          {languages ? "القرآن الكريم من" : "Whole Quran by"}
        </Text>
        <Text numberOfLines={2} className="text-white text-sm font-bold ">
          {languages ? arab_name : name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReaderCard;
