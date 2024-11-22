import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dropmenu from "./Dropmenu";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { dataArray } from "@/constants/RecitersImages";

const PlayList = () => {
  const [currentSound, setCurrentSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const storedPlaylist = await AsyncStorage.getItem("quranList");
        setPlaylist(storedPlaylist ? JSON.parse(storedPlaylist) : []);
        console.log("pp", storedPlaylist);
      } catch (e) {
        console.error("error", e);
      }
    };

    loadPlaylist();
  }, []);

  const Remove = async (musicId) => {
    try {
      let updatedPlaylist = playlist.filter(
        (playlist) => playlist?.id !== musicId
      );
      await AsyncStorage.setItem("quranList", JSON.stringify(updatedPlaylist));
      setPlaylist(updatedPlaylist); // Update the state to re-render the UI

      Alert.alert(
        "Removed!",
        `Surat ${playlist[0].chapter} has been removed from the playlist.`
      );
    } catch (e) {
      console.error(e);
    }
  };


  {/*Play Audio */}

  

  

  const playSound = async (uri, index) => {
    // If there's a currently playing sound, stop it

    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      setPlayingIndex(null);
      setCurrentSound(null);
    }

    // Load and play the new sound
    const { sound } = await Audio.Sound.createAsync({ uri: uri });
    setCurrentSound(sound);
    setPlayingIndex(index);

    await sound.playAsync();
  };

  const onPressItem = (index) => {
    if (index === playingIndex) {
      // If the same item is pressed again, stop playing
      currentSound.stopAsync();
      setCurrentSound(null);
      
    } else {
      playSound(playlist[0].uri , index);
     
    }
  };

  useEffect(() => {
    return currentSound
      ? () => {
          currentSound.unloadAsync();
        }
      : undefined;
  }, [currentSound,playlist]);

  return (
    <View>
      <FlatList
        data={playlist}
        estimatedItemSize={10}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingBottom: 2000 }}
        renderItem={({ item }) => (
          <View className=" flex-row w-full items-center justify-between px-4  py-2  ">
            <TouchableOpacity
              onPress={() => onPressItem()}
              activeOpacity={0.7}
              className="gap-x-3 flex-row"
            >
              <View className=" overflow-hidden border-[#00BCE5] border w-[50px] h-[50px] rounded-full ">
                <Image
                  resizeMode="contain"
                  className=" w-full h-full overflow-hidden"
                  source={{
                    uri: dataArray[item.reciterID]?.image
                      ? dataArray[item.reciterID]?.image
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCTMhnLo43ZCkuSoHwfvO8sj3nLMJLU9_EA&s",
                  }}
                />
              </View>

              <View className="  items-start">
                <Text className="text-white font-bold text-base">
                  {item?.chapter}
                </Text>

                <Text numberOfLines={1} className=" text-gray-400 text-xs">
                  {item?.reciterName}
                </Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row gap-x-[30px] mr-3 justify-center items-center">
              <TouchableOpacity>
                <AntDesign name="download" size={24} color="white" />
              </TouchableOpacity>
              <View className=" w-0 ">
                <Dropmenu RemoveItem={true} item={item.chapter} Remove={Remove} />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PlayList;
