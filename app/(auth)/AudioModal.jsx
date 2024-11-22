import React, { useCallback, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Entypo, FontAwesome6, FontAwesome } from "@expo/vector-icons/";
import Slider from "@react-native-community/slider";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { throttle } from "lodash"; // Import throttle
import { useLocalSearchParams } from "expo-router";

const AudioModal = ({
  nextSurah,
  idAudio,
  pauseAudio,
  currentSound,
  isPlaying,
  chapterId,
  previousSurah,
}) => {

  const setPositions = useAudioStore((state) => state.setPositions);

  const updatePosition = (value) => {
    setPosition(value);
    setPositions(value); // Update the global position
  };


  const { languages, position,setPosition, duration } = useGlobalContext();
  const nav = useNavigation();
  const params = useLocalSearchParams();
  const { reciterAR, name,chapterName } = params;

  // Format time in hh:mm:ss
  const formatTime = (millis) => {
    const hours = Math.floor(millis / 3600000);
    const minutes = Math.floor((millis % 3600000) / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

 
  return (
    <SafeAreaView className="flex-1 bg-[#191845]">
      <View className="py-20 mx-4 justify-center">
        {/* Navigation and Title Section */}
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => nav.goBack()}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          </TouchableOpacity>
          <Entypo name="plus" size={24} color="white" />
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>

        {/* Image and Chapter Details */}
        <View className="items-center mt-[30px]">
          <View className="rounded-md overflow-hidden border-2 border-[#00D1FF] w-[90%] h-[294px] items-center">
            <Image className="w-full h-full" source={require("../../assets/images/moon.png")} />
          </View>
          <View className="items-center mt-6">
            <Text className="text-white text-2xl font-bold">{chapterName}</Text>
            <Text className="text-gray-400 text-base">{languages ? arab_name : name}</Text>
          </View>
        </View>

        {/* Slider Section */}
        <View className="items-center">
          <Slider
            style={styles.slider}
            minimumValue={0}
            step={0.1}
            maximumValue={duration || 1} // Use duration from context or a default
            value={position || 0} // Use position from context
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="white"
             // Use throttled function
          />
          <View className="flex-row justify-between w-full px-2 mt-8">
            <Text className="text-white">{formatTime(position || 0)}</Text>
            <Text className="text-white">{formatTime(duration || 0)}</Text>
          </View>

          {/* Playback Controls */}
          <View className="flex-row justify-between w-[375] px-16 items-center">
            <TouchableOpacity activeOpacity={0.7} onPress={previousSurah}>
              <MaterialIcons name="skip-previous" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={pauseAudio}
              className="bg-[#00D1FF] w-16 h-16 justify-center items-center rounded-full"
            >
              {isPlaying ? (
                <FontAwesome name="pause" size={24} color="white" />
              ) : (
                <FontAwesome name="play" size={24} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={nextSurah}>
              <MaterialIcons name="skip-next" size={40} color="white" />
            </TouchableOpacity>
          </View>

          {/* Shuffle and Repeat */}
          <View className="flex-row justify-between items-center w-[300px]">
            <TouchableOpacity activeOpacity={0.7}>
              <Entypo name="shuffle" size={24} color="#00D1FF" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <FontAwesome6 name="repeat" size={24} color="#00D1FF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: "100%",
    height: 40,
  },
});

export default AudioModal;
