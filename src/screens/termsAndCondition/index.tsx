import React from 'react';
import colors from '../../utils/colors';
import { vh } from '../../utils/dimensions';
import images from '../../utils/localImages';
import routes from '../../routes/routeNames';
import CustomButton from '../../components/button';
import { strings, toUpperCase } from '../../utils/common';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


const TermsAndCondition = () => {
    const navigation = useNavigation();
    const buttonHandler = () => {
        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: routes.login}],
            }),
          );
    }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{strings.welcome_message}</Text>
      <Image source={images.circular_background} style={styles.img} resizeMode={'cover'} />
        <View style={styles.footer}>
        <Text style={styles.terms}>
          {strings.privacy_policy}
      </Text>
      <CustomButton buttonHandler={buttonHandler} label={toUpperCase(strings.agree)} widthPercent={'80%'} />
        </View>
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.black,
    justifyContent: 'space-evenly',
  },
  heading:{
    fontSize: 32,
    letterSpacing: 1,
    color: colors.off_white,
  },
  img: {
      width: 300,
      height: 300,
      borderRadius: 200,
  },
  terms: {
      color: colors.grey,
      textAlign: 'center',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
