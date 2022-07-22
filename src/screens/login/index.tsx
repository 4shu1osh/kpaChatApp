import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Colors from '../../utils/colors';
import routes from '../../routes/routeNames';
import images from '../../utils/localImages';
import {vh, vw} from '../../utils/dimensions';
import CustomButton from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {strings, toUpperCase} from '../../utils/common';
import CustomTextInput from '../../components/textInput';
import TouchableImage from '../../components/touchableImage';
import {validateEmail, validatePhone, validatePassword} from '../../utils/validation';
import ScreenHeading from '../../components/screenHeading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('screen');
const showToast = (msg: string) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
const Login = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [toggle, setToggle] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const inputCallback = (text: any) => {
    if (isFinite(text)) {
      setPhone(text);
      setEmail('');
      setEmailError('');
      if (validatePhone(text)) {
        setPhoneError('');
      } else setPhoneError(strings.invalid_phone);
    } else {
      setPhone('');
      setPhoneError('');
      setEmail(text);
      if (validateEmail(text)) {
        setEmailError('');
      } else setEmailError(strings.invalid_email);
    }
  };

  const passwordCallback = (text: any) => {
    setPassword(text);
    if (password.length === 0 || text.length === 0) {
      setPasswordError('');
    }
    if (validatePassword(text)) {
      setPasswordError('');
    } else setPasswordError(strings.invalid_password);
  };

  const toggleBtn = () => {
    setToggle(!toggle);
  };

  const buttonHandler = () => {
    if (!phone && !email) {
      showToast(strings.enter_phone_email);
      return;
    } else if (phoneError) {
      showToast(strings.invalid_phone);
      return;
    } else if (emailError) {
      showToast(strings.invalid_email);
      return;
    }
    if (!password) {
      showToast(strings.enter_password);
      return;
    } else if (password.length < 8) {
      showToast(strings.password_length);
      return;
    } else if (password.includes(' ')) {
      showToast(strings.password_no_space);
      return;
    } else if (passwordError.length > 0) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onPressSignUp = () => {
    navigation.navigate(routes.signup);
  }

  return (
      <View style={styles.parent}>
        <ScreenHeading heading={toUpperCase(strings.sign_in)} />
      <KeyboardAwareScrollView extraScrollHeight={120} contentContainerStyle={styles.container}>
        <Image
        source={images.loginbg}
        style={styles.background}
        resizeMode="contain"
        />
        <View style={styles.header}>
          <CustomTextInput
            inputCallback={inputCallback}
            placeholder={strings.email_phone}
          />
          {phone.length > 0 ? (
            <Text style={styles.error}>{phoneError}</Text>
          ) : (
            <Text style={styles.error}>{emailError}</Text>
          )}
          <CustomTextInput
          secureTextEntry={toggle}
          inputCallback={passwordCallback}
          placeholder={strings.password}
        />

        <TouchableImage
          onPress={toggleBtn}
          source={toggle ? images.eye_close : images.eye_open}
          style={styles.eye}
        />
        {passwordError && (
          <Text style={styles.error}>{passwordError}</Text>
        )}
          {loading && <ActivityIndicator size="large" color={Colors.green} />}
        </View>
        <CustomButton
          widthPercent={'24%'}
          buttonHandler={buttonHandler}
          label={toUpperCase(strings.sign_in)}
        />
        <Text style={styles.signUpText}>
          {strings.dont_have_account}
          <Text onPress={onPressSignUp} style={[styles.signUpText, {color: Colors.green}]}>
            {" "+strings.sign_up}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
      </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  background:{
    width: width,
    marginBottom: 20,
    height: height/3,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  login_background: {
    width: width,
    height: height,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  login_text: {
    fontSize: 20,
    marginBottom: vh(20),
    color: Colors.off_white,
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  error: {
    color: Colors.red,
    marginLeft: vw(20),
    alignSelf: 'flex-start',
  },
  infoText: {
    fontSize: 12,
    color: Colors.grey,
    textAlign: 'center',
    marginBottom: vh(20),
  },
  eye: {
    bottom: vh(32),
    left: vw(120),
    width: vw(20),
    height: vh(20),
    position: 'absolute',
    resizeMode: 'contain',
  },
  signUpText: {
    fontSize: 14,
    marginTop: vh(30),
    color: Colors.grey,
  }
});
