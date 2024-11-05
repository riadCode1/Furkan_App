import { View,Modal, StyleSheet, Keyboard, } from "react-native";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Octicons, AntDesign } from "@expo/vector-icons";
import AudioModal from "@/components/AudioModal";


import BottomBar from "@/components/BottomBar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useEffect, useState } from "react";

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
    position,
     setPosition,
    duration,
    setDuration,
    
    SetBar,
    isPlaying,
    languages,
    chapterId,
    pauseAudio,
    setModalVisible,
    modalVisible,
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
            padding: 5,
            position: "absolute",
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
          SetBar={SetBar}
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

      {/* Modal */}


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
        <AudioModal
                name={reciter}
                isPlaying={isPlaying}
               position={position}
               duration={duration}
               setDuration={setDuration}
               setPosition={setPosition}
               pauseAudio={pauseAudio}
                setModalVisible={setModalVisible}
              />
        </View>
      </Modal>




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
                name={reciter}
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
    </View>
  );
}

const styles = StyleSheet.create({

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#191845",
  },
  modalContent: {
    width: '100%', // full width
    height: '100%', // full height
    backgroundColor: 'white',
    padding: 20,
    backgroundColor:"#191845",
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
