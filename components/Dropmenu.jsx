import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const Dropmenu = ({reciterName, chapterID, name, chapter, Remove, item, RemoveItem,mp3,reciterID }) => {


  const musicList = [{
      id: chapterID,
      name: name,
      chapter: chapter,
      uri: mp3 ,
      reciterName:reciterName,
      reciterID:reciterID
    
    
    
    }];

  const [visible, setVisible] = useState(false);

  const openMenu = () =>{
    
    setVisible(true)
    
  };

  const closeMenu = () => {
    setVisible(false)
    
  };

  const saveToPlaylist = async (musicList) => {
    try {
      const existingPlaylist = await AsyncStorage.getItem("quranList");
      const playlist = existingPlaylist ? JSON.parse(existingPlaylist) : [];

      // Check if the music is already in the playlist

      const isAlreadyInPlaylist = playlist.some(
        (item) => item.chapter === chapter
      );

      if (isAlreadyInPlaylist) {
        Alert.alert(
          "Duplicate",
          `${musicList[0].chapter} is already in the playlist.`
        );
        return ;
      }

      // Add new music to the playlist
      playlist.push(musicList[0]);
      console.log("play", playlist[0].id);

      // Save updated playlist to AsyncStorage
      await AsyncStorage.setItem("quranList", JSON.stringify(playlist));
      
      Alert.alert(
        "Saved!",
        `${musicList[0].chapter} has been added to the playlist.`
      );
      closeMenu()
    } catch (e) {
      console.error(e);
    }
    
  };

  return (
    <View style={styles.container}>
      <Menu
        style={styles.menu}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon={() => <Icon name="more-vert" size={24} color="white" />}
            onPress={openMenu}
          />
        }
      >
        {RemoveItem ? (
          <Menu.Item
            titleStyle={{ color: "white", size: 10, fontWeight: "500" }}
            style={{ backgroundColor: "#4542BD" }}
            onPress={() => Remove(item)}
            title="Delete"
          />
        ) : (
          <Menu.Item
            titleStyle={{ color: "white", size: 10, fontWeight: "500" }}
            style={{ backgroundColor: "#4542BD" }}
            onPress={() => "play"}
            title="Play"
          />
        )}

        {RemoveItem ? (
          <Menu.Item
            titleStyle={{ color: "white", size: 10, fontWeight: "500" }}
            style={{ backgroundColor: "#4542BD" }}
            onPress={() => "Play"}
            title="Play "
          />
        ) : (
          <Menu.Item
            titleStyle={{ color: "white", size: 10, fontWeight: "500" }}
            style={{ backgroundColor: "#4542BD" }}
            onPress={() => saveToPlaylist(musicList)}
            title="Add to playlist "
          />
        )}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    width: 20,
  },
  menu: {},
});

export default Dropmenu;
