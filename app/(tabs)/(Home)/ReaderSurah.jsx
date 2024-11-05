import {
  View,
  Text,
  Platform,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
 
  ScrollView,

  StyleSheet,
  
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  FontAwesome,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import SuratReader from "../../../components/SuratReader";
import { dataArray } from "../../../constants/RecitersImages";
import { fetchChater } from "../../API/QuranApi";
import { FlashList } from "@shopify/flash-list";

import { useGlobalContext } from "@/context/GlobalProvider";
import SearchBar from "@/components/SearchBar";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";


let { width, height } = Dimensions.get("window");

const ReaderSurah = () => {
 

  const [position, setPosition] = useState(0);
  const [chapter, setchapter] = useState(false);
  const [duration, setDuration] = useState(0);
  const [idAudio, setIdAudio] = useState(null);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setloading] = useState(false);
 
  const params = useLocalSearchParams();
  const { arab_name, name, id } = params;
  const router = useRouter();

  const {
    setModalVisible,
    modalVisible,
    reciter,
    currentTrackId,
    setCurrentTrackId,
    soundRef,
    SetBar,
    languages,
    reciterAR,
    setReciterAR,
    setLanguages,
    setIDreader,
    pauseAudio,
    setChapterID,
    chapterId,
    setReciter,
    isPlaying,
    setIsPlaying,
  } = useGlobalContext();
  

  const getChapter = async () => {
    setloading(true); // Set loading to true before fetching
    try {
      const data = await fetchChater();
      // console.log("got Chapter", data.chapters[1].name_arabic);

      if (data && data.chapters) {
        setchapter(data.chapters);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error); // Handle any errors
    } finally {
      setloading(false); // Set loading to false after the fetch attempt
    }
  };


  useEffect(() => {
    getChapter();
    fetchAudioUrl(id);
    setReciter(name);
    setReciterAR(arab_name);
    setIDreader(id);
    console.log(reciter);

    {
      /*Search */
    }

    if (searchQuery.length > 1) {
      setloading(true);

      
      fetchChater(searchQuery)
        .then((suwarData) => {
          // Filter fetched recitations based on the search query
          const filteredRecitations = suwarData.chapters.filter((item) =>
            item.name_simple?.toLowerCase().includes(searchQuery.toLowerCase())
          );

          
          setFilteredData(filteredRecitations);
          console.log("filter", filteredData);
        })
        .catch((error) => {
          console.error("Error fetching recitations: ", error);
        })
        .finally(() => {
          setloading(false);
        });
    }

    {
      /*BAckground Audio */
    }
    const setupAudioMode = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });
    };

    setupAudioMode();
  }, [searchQuery,name,arab_name,languages]);

  const fetchAudioUrl = async (id) => {
    try {
      const response = await fetch(
        `https://api.quran.com/api/v4/chapter_recitations/${id}`
      );
      const data = await response.json();
      //console.log("data", data);
      setData(data.audio_files);
      console.log("data", data);

      // Get the audio for the first ayah in the Surah
      return data;
    } catch (error) {
      console.error("Error fetching audio URL:", error);
    }
  };

  const playSound = async (uri, trackId) => {
    try {
      if (soundRef.current._loaded) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      await soundRef.current.loadAsync({ uri });
      await soundRef.current.playAsync();

      // Set the current index in the list

      soundRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
    setCurrentTrackId(trackId);
    setIsPlaying(true);
    SetBar(true);
    
    setReciter(name);
    setReciterAR(arab_name);
    if (chapterId === 0) {
      setChapterID(0);
    } else {
      setChapterID(data[trackId - 1].chapter_id);
    }
  };

 


  // Function to handle playback status updates
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);

      // Check if the audio has finished playing
      if (status.didJustFinish) {
        nextSurah();
      }
    }
  };

  const handlePlay = () => {
    setChapterID(0);
    playSound(data[0].audio_url, data[0].chapter_id);
  };

  // Function to pause audio

  // Function to play the next surah
  const nextSurah = () => {
    playSound(data[currentTrackId].audio_url, data[currentTrackId].chapter_id);
  };

  // Function to play the previous surah
  const previousSurah = async () => {
    playSound(
      data[currentTrackId - 2].audio_url,
      data[currentTrackId - 2].chapter_id
    );
  };

  {
    /*SearchData */
  }

  return (
    <SafeAreaView className=" flex-1  bg-[#191845]">
      <ScrollView
        stickyHeaderIndices={[1]}
      
      >
        <View className=" relative justify-center  ">
          <Image
            resizeMode="cover"
            className="absolute   w-full h-full "
            source={{
              uri: dataArray[id]?.image
                ? dataArray[id]?.image
                : dataArray[3]?.image,
            }}
          />

          <TouchableOpacity
            onPress={() => router.navigate("Index")}
            className="rounded-full z-10 items-center justify-center mt-10 ml-4  w-10 h-10 bg-[#373597]"
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <LinearGradient
            colors={["transparent", "rgba(25,24,69,0.8)", "rgba(25,24,69,1)"]}
            style={{ width: width, height: height * 0.3 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />

          <View className=" mt-36 p-5 items-center flex-row justify-between">
            <View className=" items-start w-[70%]">
              <Text
                numberOfLines={1}
                className="text-white font-bold  text-xl "
              >
                {languages ? arab_name : name}
              </Text>
              <Text className=" text-gray-300 text-sm">
                144 {languages ? "سورة" : "Surahs"}{" "}
              </Text>
            </View>

            <View className="flex-row items-center justify-center gap-x-5">
              <TouchableOpacity>
                <FontAwesome name="random" size={24} color="#00D1FF" />
              </TouchableOpacity>

              {isPlaying ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={pauseAudio}
                  className="rounded-full items-center justify-center   w-12 h-12 bg-[#373597]"
                >
                  <FontAwesome5 name="pause" size={20} color="#00D1FF" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handlePlay}
                  className="rounded-full items-center justify-center   w-12 h-12 bg-[#373597]"
                >
                  <Entypo name="controller-play" size={24} color="#00D1FF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/*searchbar */}

        <View className="p-4  mb-4  ">
          
            <SearchBar
              title="Surah"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredData={filteredData}
            />
          

          <Text className="text-gray-500  text-lg font-normal">
            {languages ? "تلاوة من قبل" : "Recited By"}
            <Text className=" text-white font-bold">
              {" "}
              {languages ? arab_name : name}{" "}
            </Text>{" "}
          </Text>
        </View>

        {searchQuery.length > 1 ? (
          <FlashList
            data={filteredData}
            contentContainerStyle={{ paddingBottom: 170 }}
            estimatedItemSize={10}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SuratReader
                name={name}
                name_arabic={item.name_arabic}
                data={data}
                id={id}
                languages={languages}
                playSound={playSound}
                audio={item.audio_url}
                chapter={chapter}
                playing={isPlaying}
                chapterID={item.id}
                audioID={item.chapter_id}
              />
            )}
          />
        ) : loading ? (
          <Text className="text-white text-2xl">loading</Text>
        ) : (
          <FlashList
            data={data}
            contentContainerStyle={{ paddingBottom: 170 }}
            estimatedItemSize={10}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SuratReader
                name={name}
                data={data}
                id={id}
                languages={languages}
                arab_reciter={arab_name}
                playSound={playSound}
                audio={item.audio_url}
                name_arabic={item.name_arabic}
                chapter={chapter}
                playing={isPlaying}
                chapterID={item.chapter_id}
                audioID={item.chapter_id}
              />
            )}
          />
        )}
      </ScrollView>

      {/* Modal */}

      {/* <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AudioModal
                name={name}
                arab_name={arab_name}
                isPlaying={isPlaying}
                nextSurah={nextSurah}
                previousSurah={previousSurah}
                currentSound={soundRef.current}
                pauseAudio={pauseAudio}
                duration={duration}
                position={position}
                chapter={chapterId}
                idAudio={idAudio}
                setModalVisible={setModalVisible}
              />
            </View>
          </View>
        </Modal>
      </View> */}
    </SafeAreaView>
  );
};

export default ReaderSurah;

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
