import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
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
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
} from '../../utils/validation';
import ScreenHeading from '../../components/screenHeading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('screen');
const showToast = (msg: string) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
const Signup = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [toggle, setToggle] = React.useState(true);
  const [fullName, setFullName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
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

  const nameCallback = (text: any) => {
    setFullName(text);
    if (fullName.length === 0 || text.length === 0) {   
        setNameError('');
    }
    if (validateName(text)) {
        setNameError('');
    } else setNameError(strings.invalid_name);
    }

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

  const onPressSignIn = () => {
    navigation.navigate(routes.login);
  };

  return (
    <View style={styles.parent}>
      <ScreenHeading heading={toUpperCase(strings.sign_up)} />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Image
          source={images.signup}
          style={styles.background}
          resizeMode="contain"
        />
        <View style={styles.header}>
          <CustomTextInput
            inputCallback={nameCallback}
            placeholder={strings.full_name}
          />
          {fullName.length > 0 ? (
            <Text style={styles.error}>{nameError}</Text>
          ) : (
            <Text style={styles.error}>{}</Text>
          )}

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
          {passwordError && <Text style={styles.error}>{passwordError}</Text>}
          {loading && <ActivityIndicator size="large" color={Colors.green} />}
        </View>
        <CustomButton
          widthPercent={'24%'}
          buttonHandler={buttonHandler}
          label={toUpperCase(strings.sign_up)}
        />
        <Text style={styles.signinText}>
          {strings.already_have_account}
          <Text
            onPress={onPressSignIn}
            style={[styles.signinText, {color: Colors.green}]}>
            {' ' + strings.sign_in}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  background: {
    width: width,
    marginBottom: 20,
    height: height / 5,
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
  header: {
    width: '100%',
    alignItems: 'center',
  },
  error: {
    color: Colors.red,
    marginLeft: vw(20),
    alignSelf: 'flex-start',
  },

  eye: {
    bottom: vh(28),
    left: vw(120),
    width: vw(20),
    height: vh(20),
    position: 'absolute',
    resizeMode: 'contain',
  },
  signinText: {
    fontSize: 14,
    marginTop: vh(30),
    color: Colors.grey,
  },
});
