import { View, Text } from 'react-native'
import React from 'react'

const card = () => {
  return (
    <View className="flex-row justify-between w-full mt-[80px]">

    {/*Chapters*/}

    <TouchableOpacity className=" w-[168px] h-[104px]  rounded-md overflow-hidden">

      <ImageBackground resizeMode="cover" source={require("../../assets/images/quran.png")} className="w-full overflow-hidden h-full ">

      <LinearGradient
    // Button Linear Gradient
    colors={['#FF3597','rgba(0,0,0,0.1)',  'transparent']}
    className="absolute right-0 left-0 top-0 h-64">
    <Text className=" m-2 font-bold text-2xl text-white">Chapters</Text>
  </LinearGradient>
       
      </ImageBackground>

    </TouchableOpacity>


      {/*recitation*/}

      <TouchableOpacity className=" rounded-md overflow-hidden">

        <ImageBackground resizeMode="cover" source={require("../../assets/images/recitation.png")} className="w-[168px] overflow-hidden h-[104px] ">

        <LinearGradient
        // Button Linear Gradient
        colors={['#FF3514','rgba(0,0,0,0.1)',  'transparent']}
        className="absolute right-0 left-0 top-0 h-64">
        <Text className=" m-2 font-bold text-2xl text-white">recitations</Text>
        </LinearGradient>
        
        </ImageBackground>

        </TouchableOpacity>


    
  </View>


  <View className="flex-row justify-between gap-x-2 mt-4">

{/*reciters*/}

<TouchableOpacity className=" rounded-md overflow-hidden">

      <ImageBackground resizeMode="cover" source={require("../../assets/images/reciters.png")} className="w-[168px] overflow-hidden h-[104px] ">

      <LinearGradient
      // Button Linear Gradient
      colors={['#1464FF','rgba(0,0,0,0.1)',  'transparent']}
      className="absolute right-0 left-0 top-0 h-64">
      <Text className=" m-2 font-bold text-2xl text-white">reciters</Text>
      </LinearGradient>

      </ImageBackground>

      </TouchableOpacity>


     {/*reciters*/}

<TouchableOpacity className=" rounded-md overflow-hidden">

  <ImageBackground resizeMode="cover" source={require("../../assets/images/mekah.png")} className="w-[168px] overflow-hidden h-[104px] ">

  <LinearGradient
  // Button Linear Gradient
  colors={['#14F1FF','rgba(0,0,0,0.1)',  'transparent']}
  className="absolute right-0 left-0 top-0 h-64">
  <Text className=" m-2 font-bold text-2xl text-white">Live Makah & Madinah</Text>
  </LinearGradient>

  </ImageBackground>

  </TouchableOpacity>


</View>
 
  )
}

export default card