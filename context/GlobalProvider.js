import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [reciter, setReciter] = useState("");
  const [reciterAR, setReciterAR] = useState("");
  const [languages, setLanguages] = useState(false);
  const [idReader, setIDreader] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [chapterId, setChapterID] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bar, SetBar] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
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



  
  

  return (
    <GlobalContext.Provider
      value={{
        reciter,
        setReciter,
        pauseAudio,
        currentTrackId,
        setCurrentTrackId,
        soundRef,
        SetBar,
        bar,
        setDuration,
        duration,
        setPosition,
        position,
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
        setModalVisible
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
