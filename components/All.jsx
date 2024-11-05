import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Dropmenu from "./Dropmenu";

const All = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 400 }}
    >
      {/*PlayList */}
      <View className=" ">
        <Text className="text-white text-xl font-bold">PlayList</Text>
      </View>

      <View className=" mt-5 flex-row w-[370px] justify-between items-center ">
        <TouchableOpacity className="flex-row gap-x-5">
          <View className=" w-12 h-12">
            <Image
              resizeMode="contain"
              className="h-full w-full"
              source={require("../assets/images/SMoon.png")}
            />
          </View>
          <View className="mt-1">
            <Text className=" text-[16px] text-white font-[500]">
              Quran for Sleep
            </Text>
            <Text className="text-gray-400 text-sm">Tracks</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className=" mt-5 flex-row w-[370px] justify-between items-center ">
        <TouchableOpacity className="flex-row gap-x-5">
          <View className=" w-12 h-12">
            <Image
              resizeMode="contain"
              className="h-full w-full"
              source={require("../assets/images/noImage.png")}
            />
          </View>
          <View className="mt-1">
            <Text className=" text-[16px] text-white font-[500]">
              My PlatList
            </Text>
            <Text className="text-gray-400 text-sm">0 Tracks</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/*Tracks */}

      <View className="mt-5">
        <View className=" mb-4 ">
          <Text className="text-white text-xl font-bold">Tracks</Text>
        </View>
      </View>

      <View className=" flex-row w-full items-center justify-between  py-2  ">
        <TouchableOpacity
          onPress={() => onPressItem()}
          activeOpacity={0.7}
          className="gap-x-3 flex-row"
        >
          <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
            <Image
              resizeMode="contain"
              className=" w-full h-full overflow-hidden"
              source={require("../assets/images/reader.png")}
            />
          </View>

          <View className="  items-start">
            <Text className="text-white font-bold text-base">Al fatiha</Text>

            <Text numberOfLines={1} className=" text-gray-400 text-xs">
              Abdulbasset
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

      <View className=" flex-row w-full items-center justify-between  py-2  ">
        <TouchableOpacity
          onPress={() => onPressItem()}
          activeOpacity={0.7}
          className="gap-x-3 flex-row"
        >
          <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
            <Image
              resizeMode="contain"
              className=" w-full h-full overflow-hidden"
              source={require("../assets/images/reader.png")}
            />
          </View>

          <View className="  items-start">
            <Text className="text-white font-bold text-base">Annas</Text>

            <Text numberOfLines={1} className=" text-gray-400 text-xs">
              Abdulbasset
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

      <View className=" flex-row w-full items-center justify-between  py-2  ">
        <TouchableOpacity
          onPress={() => onPressItem()}
          activeOpacity={0.7}
          className="gap-x-3 flex-row"
        >
          <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
            <Image
              resizeMode="contain"
              className=" w-full h-full overflow-hidden"
              source={require("../assets/images/reader.png")}
            />
          </View>

          <View className="  items-start">
            <Text className="text-white font-bold text-base">Al Bakara</Text>

            <Text numberOfLines={1} className=" text-gray-400 text-xs">
              Abdulbasset
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

      <View className=" flex-row w-full items-center justify-between  py-2  ">
        <TouchableOpacity
          onPress={() => onPressItem()}
          activeOpacity={0.7}
          className="gap-x-3 flex-row"
        >
          <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
            <Image
              resizeMode="contain"
              className=" w-full h-full overflow-hidden"
              source={require("../assets/images/reader.png")}
            />
          </View>

          <View className="  items-start">
            <Text className="text-white font-bold text-base">Al fatiha</Text>

            <Text numberOfLines={1} className=" text-gray-400 text-xs">
              Abdulbasset
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

      <View className=" flex-row w-full items-center justify-between  py-2  ">
        <TouchableOpacity
          onPress={() => onPressItem()}
          activeOpacity={0.7}
          className="gap-x-3 flex-row"
        >
          <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
            <Image
              resizeMode="contain"
              className=" w-full h-full overflow-hidden"
              source={require("../assets/images/reader.png")}
            />
          </View>

          <View className="  items-start">
            <Text className="text-white font-bold text-base">Al fatiha</Text>

            <Text numberOfLines={1} className=" text-gray-400 text-xs">
              Abdulbasset
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

      <View className=" flex-row w-full items-center justify-between  py-2  ">
        <TouchableOpacity
          onPress={() => onPressItem()}
          activeOpacity={0.7}
          className="gap-x-3 flex-row"
        >
          <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
            <Image
              resizeMode="contain"
              className=" w-full h-full overflow-hidden"
              source={require("../assets/images/reader.png")}
            />
          </View>

          <View className="  items-start">
            <Text className="text-white font-bold text-base">Al fatiha</Text>

            <Text numberOfLines={1} className=" text-gray-400 text-xs">
              Abdulbasset
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
    </ScrollView>
  );
};

export default All;
