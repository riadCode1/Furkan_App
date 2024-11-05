import { View, Text } from 'react-native'
import React from 'react'

const Details = ({info}) => {
  return (
    <View className=" mt-5 p-4">
        <Text className="text-lg mb-2 font-bold text-white">About Chapter</Text>

        <Text className=" text-gray-300 text-sm   ">{info}</Text>
    </View>
  )
}

export default Details