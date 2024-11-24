import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import {Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [reciter, setReciter] = useState("");
  const [reciterAR, setReciterAR] = useState("");
  const [languages, setLanguages] = useState(false);
  const [idReader, setIDreader] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [chapterId, setChapterID] = useState(null);
  const [arabicCH, setArabicCH] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);
 
  const [chapterAudio, setAudioChapter] = useState([]);
  const soundRef = useRef(new Audio.Sound());
 

  const pauseAudio = async () => {
    if (isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
      setPlaying(true);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
      setPlaying(true);
    }
  };

  const playSound = async (uri, trackId,chapterName,name,arabName,id,arabicCh) => {
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
    setChapterID(chapterName);
    setArabicCH(arabicCh)
    setIsPlaying(true);
    setReciter(name);
    setIDreader(id);
    setReciterAR(arabName)
    
   
  };
  console.log(position)
  // Function to handle playback status updates
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);

      // Check if the audio has finished playing
      if (status.didJustFinish) {
        nextSurah()
      }
    }
  };

  useEffect(() => {
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
  }, []);



  
  

  return (
    <GlobalContext.Provider
      value={{
        reciter,
        setReciter,
        pauseAudio,
        playSound,
        soundRef,
        currentTrackId,
         setCurrentTrackId,
        position,
         setPosition,
         duration,
          setDuration,
        reciterAR,
         setReciterAR,
        idReader,
         setIDreader,
        chapterAudio,
         setAudioChapter,
         languages,
          setLanguages,
        playing,
        isPlaying,
        chapterId,
        setChapterID,
        setIsPlaying,
        modalVisible,
        setModalVisible,
        arabicCH,
         setArabicCH
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
