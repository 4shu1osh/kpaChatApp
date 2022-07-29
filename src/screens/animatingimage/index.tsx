//animate image to enlarge and fit screen size
import React, {useState} from 'react';
import {
  View,
  Image,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from 'react-native';
import images from '../../utils/localImages';

const {width} = Dimensions.get('window');

const AnimatingImage = () => {
  const value = React.useState(new Animated.Value(0))[0];

  const animate = () => {
    Animated.timing(value, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  animate();

  const animatedStyle = {
    width: 30,
    height: 30,
    borderRadius: 50,
    transform: [
      {
        scale: value.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 500],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image source={images.chatsplash} style={styles.image} />
      </Animated.View>
    </View>
  );
};

export default AnimatingImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: width,
  },
});
