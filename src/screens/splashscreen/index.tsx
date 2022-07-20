import React from 'react';
import colors from '../../utils/colors';
import images from '../../utils/localImages';
import routes from '../../routes/routeNames';
import {vh, vw} from '../../utils/dimensions';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';

const {width} = Dimensions.get('screen');

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: routes.termsAndCondition}],
        }),
      );
    }, 2000);
  }, [fadeAnim]);

  return (
    <ImageBackground style={styles.container} source={images.background}>
      <Animated.View style={{opacity: fadeAnim}}>
        <Image
          source={images.spalsh}
          style={styles.splash}
          resizeMode={'contain'}
        />
      </Animated.View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splash: {
    width: vw(width),
    height: vh(width),
  },
});
