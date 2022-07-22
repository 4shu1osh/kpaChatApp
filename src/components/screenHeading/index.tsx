import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/colors';

const ScreenHeading = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.head} />
      <View style={styles.notch}>
        <Text style={styles.heading}>{props.heading}</Text>
      </View>
    </View>
  );
};

export default ScreenHeading;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  notch: {
    height: 30,
    width: '40%',
    alignItems:'center',
    borderBottomLeftRadius: 56,
    borderBottomRightRadius: 56,
    backgroundColor: Colors.green,
  },
  head: {
    height: 40,
    width: '100%',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    backgroundColor: Colors.green,
  },
  heading: {
    bottom: 10,
    fontSize: 26,
    fontWeight: '900',
    color: Colors.white,
  },
});
