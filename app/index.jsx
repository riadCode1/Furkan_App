import { View, Text, TouchableOpacity, Image, Platform, ImageBackground,  } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'





const index = () => {

  
  
  useEffect(() => {
    setTimeout(() => {
    router.replace("Index")
    }, 6000);

   
  
  }, [])

  
 
  return (
    <ImageBackground resizeMode='cover'  source={require("../assets/images/SplashFK.png")}
                     className="flex-1  items-center justify-center" >


    

        <View>
          <Image className="h-[150px] w-[150px] " resizeMode='contain' source={require("../assets/images/Logo.png")}/>

          <View className="items-center">
            <Text className=" text-[#00D1FF] text-3xl font-bold">Furqan</Text>
             <Image className=" " resizeMode='contain' source={require("../assets/images/الفرقان.png")}/>
          </View>
            
        </View>
       
      
    </ImageBackground>
  )
}

export default index