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
import {strings, toUpperCase} from '../../utils/common';
import CustomTextInput from '../../components/textInput';
import firestore from '@react-native-firebase/firestore';
import TouchableImage from '../../components/touchableImage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
} from '../../utils/validation';
import ScreenHeading from '../../components/screenHeading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import commonFunction from '../../utils/commonFunction';
import {setUserDataAsync} from '../../utils/storage';
import CustomModal from '../../components/modal';

const {width, height} = Dimensions.get('screen');
const showToast = (msg: string) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
const Signup = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [toggle1, setToggle1] = React.useState(true);
  const [toggle2, setToggle2] = React.useState(true);
  const [fullName, setFullName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

  const naviagteToProfile = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routes.profile}],
      }),
    );
  };

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
  };

  const passwordCallback = (text: any) => {
    setPassword(text);
    if (password.length === 0 || text.length === 0) {
      setPasswordError('');
    } else if (validatePassword(text)) {
      setPasswordError('');
    } else if (password.length > 20) {
      showToast(strings.password_max_length);
    } else setPasswordError(strings.invalid_password);
  };

  const confirmPasswordCallback = (text: any) => {
    setConfirmPassword(text);
    if (confirmPassword.length === 0 || text.length === 0) {
      setConfirmPasswordError('');
    }
    if (!validateConfirmPassword(text, password)) {
      setConfirmPasswordError(strings.password_not_match);
    }
    if (validateConfirmPassword(text, password)) {
      setConfirmPasswordError('');
    }
  };

  const toggleBtn1 = () => {
    setToggle1(!toggle1);
  };

  const toggleBtn2 = () => {
    setToggle2(!toggle2);
  };

  const buttonHandler = () => {
    if (!fullName) {
      showToast(strings.enter_phone_email);
      return;
    } else if (!phone && !email) {
      showToast(strings.enter_phone_email);
      return;
    } else if (phoneError) {
      showToast(strings.invalid_phone);
      return;
    } else if (emailError) {
      showToast(strings.invalid_email);
      return;
    } else if (!password) {
      showToast(strings.enter_password);
      return;
    } else if (password.length < 8) {
      showToast(strings.password_length);
      return;
    } else if (password.includes(' ')) {
      showToast(strings.password_no_space);
      return;
    } else if (password.length > 20) {
      showToast(strings.password_max_length);
      return;
    } else if (!validateConfirmPassword(password, confirmPassword)) {
      showToast(strings.password_not_match);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      commonFunction.createUserWithEmail(
        email,
        password,
        (success: any) => {
          setShowModal(true);
          console.log('success', success);
          setUserDataAsync({
            phone: phone,
            name: fullName,
            uid: success?.user?._user?.uid,
            email: success?.user?._user?.email,
          });
          firestore()
            .collection('Users')
            .doc(success?.user?._user?.uid)
            .set({
              name: fullName,
              uid: success?.user?._user?.uid,
              email: success?.user?._user?.email,
            })
            .then(() => {
              console.log('User added!');
            });
          setShowModal(true);
        },
        (error: any) => {
          console.log('error', error);
        },
      );
    }
  };

  const onPressSignIn = () => {
    navigation.navigate(routes.login);
  };

  return (
    <View style={styles.parent}>
      <ScreenHeading heading={toUpperCase(strings.register)} />
      <KeyboardAwareScrollView
        extraScrollHeight={40}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
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
            right={
              <Image
                source={phone ? images.dialpad : email ? images.email : null}
                style={styles.icon}
                resizeMode="contain"
              />
            }
            maxLength={phone?.length > 0 ? 10 : null}
          />
          {phone.length > 0 ? (
            <Text style={styles.error}>{phoneError}</Text>
          ) : (
            <Text style={styles.error}>{emailError}</Text>
          )}
          <CustomTextInput
            secureTextEntry={toggle1}
            placeholder={strings.password}
            inputCallback={passwordCallback}
            right={
              <TouchableImage
                style={styles.icon}
                resizeMode="contain"
                onPress={toggleBtn1}
                source={toggle1 ? images.eye_close : images.eye_open}
              />
            }
          />
          {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : (
            <Text style={styles.error}>{}</Text>
          )}
          <CustomTextInput
            secureTextEntry={toggle2}
            placeholder={strings.confirm_password}
            inputCallback={confirmPasswordCallback}
            right={
              <TouchableImage
                style={styles.icon}
                resizeMode="contain"
                onPress={toggleBtn2}
                source={toggle2 ? images.eye_close : images.eye_open}
              />
            }
          />
          {confirmPasswordError && (
            <Text style={styles.error}>{confirmPasswordError}</Text>
          )}
        </View>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.white} />
          </View>
        ) : (
          <CustomButton
            buttonHandler={buttonHandler}
            label={toUpperCase(strings.sign_up)}
          />
        )}
        <Text style={styles.signinText}>
          {strings.already_have_account}
          <Text
            onPress={onPressSignIn}
            style={[
              styles.signinText,
              {color: Colors.green, textDecorationLine: 'underline'},
            ]}>
            {' ' + strings.sign_in}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
        <CustomModal showModal={showModal} buttonHandler={naviagteToProfile} />
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
    paddingBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
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
    bottom: vh(30),
    left: vw(120),
    width: vw(20),
    height: vh(20),
    position: 'absolute',
    resizeMode: 'contain',
  },
  signinText: {
    fontSize: 14,
    color: Colors.grey,
  },
  icon: {
    width: vw(20),
    height: vh(20),
  },
  loader: {
    width: '94%',
    height: vh(60),
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: vh(30),
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
});
