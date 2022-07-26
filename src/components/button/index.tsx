import React from 'react';
import {vh} from '../../utils/dimensions';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../utils/colors';

const CustomButton = ({buttonHandler, label}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={buttonHandler}
      style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: Colors.white,
  },
  button: {
    width: '94%',
    height: vh(60),
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: vh(26),
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
});
