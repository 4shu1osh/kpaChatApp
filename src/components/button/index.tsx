import React from 'react';
import {vh} from '../../utils/dimensions';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../utils/colors';

const CustomButton = ({buttonHandler, label, widthPercent}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={buttonHandler}
      style={[styles.button, {width: widthPercent}]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
  },
  button: {
    height: vh(40),
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: vh(26),
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
});
