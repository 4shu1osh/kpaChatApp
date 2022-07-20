import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ImageBackground,
  Button,
  Alert,
} from 'react-native';
import React from 'react';
import colors from '../../utils/colors';
import images from '../../utils/localImages';
import routes from '../../routes/routeNames';
import {vh, vw} from '../../utils/dimensions';
import CustomButton from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {strings, toUpperCase} from '../../utils/common';
import CustomTextInput from '../../components/textInput';
import {validateEmail, validatePhone} from '../../utils/validation';


const {width, height} = Dimensions.get('screen');
const showToast = (msg: string) => {
  ToastAndroid.show(
    msg,
    ToastAndroid.LONG,
  );
}
const Login = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  

  const _onChangeText = (text: any) => {
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

  const buttonHandler = () => {
    if(!phone && !email) {
      showToast(strings.enter_phone_email);
      return;
    }
    else if(phoneError) {
      showToast(strings.invalid_phone);
      return;

    }
    else if(emailError) {
      showToast(strings.invalid_email);
      return;

    }
    navigation.navigate(routes.password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.login_text}>{strings.login_text}</Text>
        <CustomTextInput
          placeholder={strings.email_phone}
          onChangeText={_onChangeText}
        />
        {
          phone.length > 0 ? (
            <Text style={styles.error}>{phoneError}</Text>
          ) 
          :
          (
            <Text style={styles.error}>{emailError}</Text>
          )
        }
      </View>
      <CustomButton
        widthPercent={'24%'}
        buttonHandler={buttonHandler}
        label={toUpperCase(strings.next)}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.black,
    justifyContent: 'space-between',
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
    color: colors.off_white,
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  error: {
    color: colors.red,
    marginLeft: vw(20),
    alignSelf: 'flex-start'
  },
});
