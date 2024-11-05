import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ModalPortal } from 'react-native-modals'; 
import GlobalProvider from "../context/GlobalProvider"
export default function RootLayout() {
  return (
   <GlobalProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        

        
        <PaperProvider>
        <ModalPortal />
       
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
         
        </PaperProvider>
        
      </GestureHandlerRootView>
       </GlobalProvider>
      
      
    
  );
}
