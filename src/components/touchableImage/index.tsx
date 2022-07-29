import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function TouchableImage(props: any) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.9}>
      <Image source={props.source} style={props.style} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hitSlopStyle: {
    top: 16,
    left: 16,
    bottom: 16,
    right: 16,
  },
});
