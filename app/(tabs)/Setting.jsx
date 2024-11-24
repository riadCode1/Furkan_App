import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider';





const Setting = () => {



  const toggleState = () => {
  setLanguages(prevState => !prevState); // Toggle the current state
};
  const {languages, setLanguages } = useGlobalContext();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>State: {languages.toString()}</Text>
      <Button
        title={languages ? 'Switch to English' : 'Switch to Arabic'}
        onPress={toggleState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Setting