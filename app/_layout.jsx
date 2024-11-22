import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";


import GlobalProvider from "../context/GlobalProvider"


export default function RootLayout() {
  return (

   
   <GlobalProvider>
    
    
      <GestureHandlerRootView style={{ flex: 1 }}>
        

         
        <PaperProvider>
       
        
          <Stack>
            <Stack.Screen  name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ animation:"slide_from_bottom", headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{animation:"simple_push", headerShown: false }} />
          </Stack>
         
        </PaperProvider>
        
      </GestureHandlerRootView>
       </GlobalProvider>
       
       
       
      
      
    
  );
}
