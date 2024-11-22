import { View, StyleSheet, Keyboard, Text, } from "react-native";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Octicons, AntDesign } from "@expo/vector-icons";



import BottomBar from "@/components/BottomBar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useEffect, useRef, useState } from "react";

export default function Layout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const {
    reciter,
    reciterAR,
    idReader,

    setModalVisible,

    isPlaying,
    languages,
    chapterId,
    pauseAudio,
  } = useGlobalContext();
  return (
    <View style={{ flex: 1 }}>
      {/* Tabs Component */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: isKeyboardVisible ? "none" : "flex",
            height: 74,
            position: "absolute",
            borderTopWidth: 1,
            borderTopColor: "#00D1FF",
            elevation: 0,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={100}
              tint="systemChromeMaterialDark"
              style={{ flex: 1 }}
            />
          ),
          tabBarLabelStyle: {
            
            
          },
        }}
      >
        <Tabs.Screen
          name="(Home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Octicons
                name="home"
                size={24}
                color={focused ? "#00D1FF" : "#9391E4"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign
                size={24}
                name="search1"
                color={focused ? "#00D1FF" : "#9391E4"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign
                size={24}
                name="download"
                color={focused ? "#00D1FF" : "#9391E4"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Setting"
          options={{
            title: "Setting",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign
                size={24}
                name="setting"
                color={focused ? "#00D1FF" : "#9391E4"}
              />
            ),
          }}
        />
      </Tabs>

      {/* Component on top of Tabs */}

      {isKeyboardVisible ? (
        ""
      ) : (
        <BottomBar
          reciterAR={reciterAR}
          languages={languages}
          playing={isPlaying}
          setModalVisible={setModalVisible}
          idReader={idReader}
          pauseAudio={pauseAudio}
          chapterId={chapterId}
          name={reciter}
        />
      )}

    </View>
  );
}


