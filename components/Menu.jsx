import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';


const Menu = () => {
  return (
    <View className="items-start">
    <Image className="h-10 w-10 " resizeMode='contain' source={require("../assets/images/Logo.png")}/>
    <View className="items-center">
      <Text className=" text-[#00D1FF]  font-bold">Furqan</Text>
    </View>

    <View className="mt-20">

      <View className="flex-row  items-center mb-6 gap-x-3">
      <AntDesign name="setting" size={24} color="white" />
      <TouchableOpacity>
        <Text className="text-white text-base">Settings</Text>
      </TouchableOpacity>
      </View>


      <View className="flex-row  items-center mb-6 gap-x-3">
      <Ionicons name="person-circle" size={24} color="white" />
      <TouchableOpacity>
        <Text className="text-white text-base">Profile</Text>
      </TouchableOpacity>
      </View>

      <View className="flex-row  items-center mb-6 gap-x-3">
      <MaterialCommunityIcons name="heart" size={24} color="white" />
      <TouchableOpacity>
        <Text className="text-white text-base">Liked Surah</Text>
      </TouchableOpacity>
      </View>

      <View className="flex-row  items-center mb-6 gap-x-3">
      <FontAwesome6 name="earth-africa" size={24} color="white" />
      <TouchableOpacity>
        <Text className="text-white text-base">Language</Text>
      </TouchableOpacity>
      </View>
      
      <View className="flex-row  items-center mb-6 gap-x-3">
      <MaterialCommunityIcons name="message-reply-text-outline" size={24} color="white" />
      <TouchableOpacity>
        <Text className="text-white text-base">Contact us</Text>
      </TouchableOpacity>
      </View>

      <View className="flex-row  items-center mb-6 gap-x-3">
      <MaterialCommunityIcons name="torch" size={24} color="white" />
      <TouchableOpacity>
        <Text className="text-white text-base">FAQs</Text>
      </TouchableOpacity>
      </View>

      



    </View>

      
  </View>
  )
}

export default Menu