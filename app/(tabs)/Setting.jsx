import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider'; // Ensure correct import

const AudioProgressBar = () => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (sliderValue) => {
    setValue(sliderValue);
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={value}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1EB1FC"
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
  slider: {
    width: 300,
    height: 40,
  },
});

export default AudioProgressBar;
