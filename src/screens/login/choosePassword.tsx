import {Text, View, StyleSheet, Dimensions, ToastAndroid} from 'react-native';
import React from 'react';
import colors from '../../utils/colors';
import images from '../../utils/localImages';
import routes from '../../routes/routeNames';
import {vh, vw} from '../../utils/dimensions';
import CustomButton from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {strings, toUpperCase} from '../../utils/common';
import {validatePassword} from '../../utils/validation';
import CustomTextInput from '../../components/textInput';
import TouchableImage from '../../components/touchableImage';

const {width, height} = Dimensions.get('screen');

const showToast = (msg: string) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
const ChoosePassword = () => {
  const navigation = useNavigation<any>();
  const [toggle, setToggle] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const _onChangeText = (text: any) => {
    
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
    if (!password) {
      showToast(strings.enter_password);
      return;
    } else if (password.length < 8) {
      showToast(strings.password_length);
      return;
    } else if (password.includes(' ')) {
      showToast(strings.password_no_space);
      return;
    }
    navigation.navigate(routes.login);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.login_text}>{strings.login_password}</Text>
        <CustomTextInput
          secureTextEntry={toggle}
          onChangeText={_onChangeText}
          placeholder={strings.password}
        />

        <TouchableImage
          onPress={toggleBtn}
          source={toggle ? images.eye_close : images.eye_open}
          style={styles.eye}
        />
        {passwordError && (
          <Text style={styles.error_text}>{passwordError}</Text>
        )}
      </View>
      <CustomButton
        widthPercent={'24%'}
        buttonHandler={buttonHandler}
        label={toUpperCase(strings.next)}
      />
    </View>
  );
};

export default ChoosePassword;

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
  error_text: {
    color: colors.red,
    marginLeft: vw(20),
    alignSelf: 'flex-start',
  },
  eye: {
    bottom: vh(34),
    left: vw(120),
    width: vw(20),
    height: vh(20),
    position: 'absolute',
    resizeMode: 'contain',
  },
});
