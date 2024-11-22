import { View, Text, TouchableOpacity, ScrollView, Modal, Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import All from "../../components/All";
import PlayList from "../../components/PlayList";
import Tracks from "../../components/Tracks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAudio from "../../components/ModalAudio";
import { useGlobalContext } from "@/context/GlobalProvider";


const Library = () => {
  const [activeButton, setActiveButton] = useState("button1");
  const [savedSurahs, setSavedSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    setLanguages,
    languages,
    modalVisible,
    setModalVisible
  } = useGlobalContext();

  useEffect(() => {
    // Retrieve the saved data from AsyncStorage
    const loadSavedSurahs = async () => {
      try {
        const storedData = await AsyncStorage.getItem("quranData");
        if (storedData !== null) {
          setSavedSurahs(JSON.parse(storedData));
          console.log(storedData)
        }
      } catch (error) {
        console.error("Error loading stored surahs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedSurahs();
  }, []);

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  const getBackgroundColor = (button) => {
    return activeButton === button ? "#00D1FF" : "transparent";
  };
  const getColor = (button) => {
    return activeButton === button ? "#00D1FF" : "#9ca3af";
  };
  return (
    <SafeAreaView className="flex-1   bg-[#191845] ">
      {/*Top*/}

      <View className="flex-row items-center justify-between p-4 ">
        <TouchableOpacity
          onPress={() => router.navigate("Index")}
          className="rounded-full z-10 items-center justify-center w-10 h-10 bg-[#373597]"
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>

        <View className="flex-row gap-x-4">
          <TouchableOpacity>
            <Entypo name="plus" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/*scroll */}

      <View className="h-[94px]">
        <ScrollView
          showsHorizontalScrollIndicator={false}
          className=" h-[40px]  mt-8  self-center "
          horizontal
        >
          <TouchableOpacity className="w-[102px] ml-4 h-[38px] bg-[#373597] items-center justify-center rounded-3xl ">
            <Text className="text-white font-bold text-xs ">Most-Played</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[90px] h-[38px] ml-4 bg-[#373597] items-center justify-center rounded-3xl ">
            <Text className="text-white font-bold text-xs ">Download</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[102px] h-[38px] ml-4 bg-[#373597] items-center justify-center rounded-3xl ">
            <Text className="text-white font-bold text-xs ">recent-Played</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[70px] h-[38px] ml-4 bg-[#373597] items-center justify-center rounded-3xl ">
            <Text className="text-white font-bold text-xs ">Favorite</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/*Buttons */}

      <View className=" mt-3  ">
        <View className="flex-row items-center justify-center mb-8">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleButtonPress("button1")}
            className=" justify-center items-center  "
          >
            <Text style={[{ color: getColor("button1") }]} className="  mb-3 ">
              All
            </Text>
            <View
              style={[{ backgroundColor: getBackgroundColor("button1") }]}
              className="  w-28 h-[1px] rounded  "
            ></View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleButtonPress("button2")}
            className=" justify-center items-center  "
          >
            <Text
              style={[{ color: getColor("button2") }]}
              className="text-gray-400  mb-3 "
            >
              PlayList
            </Text>
            <View
              style={[{ backgroundColor: getBackgroundColor("button2") }]}
              className="  w-28 h-[1px] rounded  "
            ></View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleButtonPress("button3")}
            className=" justify-center items-center  "
          >
            <Text
              style={[{ color: getColor("button3") }]}
              className="text-gray-400  mb-3 "
            >
              Tracks
            </Text>
            <View
              style={[{ backgroundColor: getBackgroundColor("button3") }]}
              className="  w-28 h-[1px] rounded  "
            ></View>
          </TouchableOpacity>
        </View>

        <View className="px-4">
          {activeButton === "button1" && <All />}

          {activeButton === "button2" && <PlayList  />}

          {activeButton === "button3" && <Tracks />}
        </View>
      </View>
       {/* Modal */}

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    height: "100%",
    width: "100%",
  },
  modalView: {
    height: "100%",
    width: "100%",
    backgroundColor: "#191845",
  },
});
export default Library;
