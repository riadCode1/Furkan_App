 import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
 import React from 'react'
 import { SafeAreaView } from 'react-native-safe-area-context'
 import { useGlobalContext } from '@/context/GlobalProvider';


 const Setting = () => {

   const {
     setLanguages,languages
   } = useGlobalContext();

   const toggleValue = () => {
     setLanguages(prevState => !prevState);
   };
   return (
     <SafeAreaView>
     
      <TouchableOpacity onPress={toggleValue}>
       <Text>
       
         {languages===true&& "ar"}
         {languages===false&&"eng"}
       </Text>
      </TouchableOpacity>

      <Sliders
         style={styles.slider}
         minimumValue={0}
         maximumValue={100}
         step={1}
         value={1}
         onValueChange={(val) => setValue(val)}
         minimumTrackTintColor="#1EB1FC"
         maximumTrackTintColor="#d3d3d3"
         thumbTintColor="#1EB1FC"
       />
    
     </SafeAreaView>
   )
 }


 import Sliders from '@react-native-community/slider';



 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 16,
   },
   label: {
     fontSize: 24,
     marginBottom: 20,
   },
   slider: {
     width: '100%',
     height: 40,
   },
 });




 export default Setting



