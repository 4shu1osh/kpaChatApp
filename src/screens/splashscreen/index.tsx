import {
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Colors from '../../utils/colors';
import images from '../../utils/localImages';
import routes from '../../routes/routeNames';
import {vh, vw} from '../../utils/dimensions';
import { getUserDataAsync } from '../../utils/storage';
import {CommonActions, useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
    setTimeout(async () => {
      const data =  await getUserDataAsync();
      if (data) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: routes.chatStack}],
        }),
      );
      }
      else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: routes.authStack}],
          }),
        );
      }
    }, 3500);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.txt,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateX: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          },
        ]}>
        {'Say More.'}
      </Animated.Text>

      <Animated.View style={{opacity: fadeAnim}}>
        <Image
          source={images.chatsplash}
          style={styles.splash}
          resizeMode={'contain'}
        />
      </Animated.View>
      <Animated.Text
        style={[
          styles.txt,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateX: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}>
        {'Do More.'}
      </Animated.Text>
      <View style={styles.footer}>
        <Text style={styles.logoText}>{'K P A - C H A T'}</Text>
        <Text style={styles.copyright}>{'©2022. All rights reserved.'}</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  splash: {
    width: vw(width),
    height: vh(width),
  },
  txt: {
    fontSize: 20,
    color: Colors.green,
  },
  logoText: {
    fontSize: 14,
    marginTop: vh(50),
    letterSpacing: 10,
    color: Colors.green,
    textAlign: 'center',
    marginBottom: vh(10),
  },
  copyright: {
    fontSize: 12,
    color: Colors.grey,
    textAlign: 'center',
  },
  footer: {
    marginTop: 100,
  },
});
