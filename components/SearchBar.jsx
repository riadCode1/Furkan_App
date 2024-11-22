import {
  View,
  Text,
  TextInput,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Ios = Platform.OS == "ios";
let { width, height } = Dimensions.get("window");

const SearchBar = ({ title, setSearchQuery, searchQuery }) => {
  return (
    <View>
      <Animated.View
        style={{ width: width * 0.93 }}
        className="border rounded-lg  px-4 bg-white h-[48px] self-center    items-center flex-row justify-between"
      >
        <TextInput
          placeholder={` ${title}`}
          placeholderTextColor={"#99A5FF"}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          style={{ width: width * 0.7 }}
        />

        <Feather
          name="search"
          onPress={""}
          size={24}
          strokeWidth={2}
          color="#2D29E0"
        />
      </Animated.View>
    </View>
  );
};

export default SearchBar;
