import React from 'react';
import colors from '../../utils/colors';
import {vh, vw} from '../../utils/dimensions';
import {View, TextInput, StyleSheet, Animated} from 'react-native';

const CustomTextInput = (props: any) => {
  const inputRef = React.useRef<TextInput>(null);

  const [input, setInput] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  console.log(input);
  const value = React.useState(new Animated.Value(0))[0];

  const {placeholder, inputCallback, secureTextEntry, right, maxLength} = props;

  const _onFocus = () => {
    setIsFocused(true);
    inputRef?.current?.focus();
    Animated.timing(value, {
      toValue: 10,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const _onBlur = () => {
    setIsFocused(false);
    !input &&
      Animated.timing(value, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
  };

  const _onChangeText = (text: string) => {
    setInput(text);
    inputCallback(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        onBlur={_onBlur}
        onFocus={_onFocus}
        style={styles.input}
        maxLength={maxLength}
        onChangeText={_onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.green}
      />
      <Animated.Text
        onPress={_onFocus}
        style={[
          styles.txt,
          {
            transform: [
              {
                scale: value.interpolate({
                  inputRange: [0, 10],
                  outputRange: [1.3, 0.9],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: value.interpolate({
                  inputRange: [0, 10],
                  outputRange: [-8, -42],
                }),
              },
              {
                translateX: value.interpolate({
                  inputRange: [0, 10],
                  outputRange: [-8, -28],
                }),
              },
            ],
          },
        ]}>
        {placeholder}
      </Animated.Text>
      {
        right && 
        <View style={styles.rightComponent}>
          {right}
        </View>
      }
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    width: '94%',
    height: vh(60),
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'center',
    color: colors.black,
    marginVertical: vh(10),
    marginHorizontal: vw(16),
    paddingHorizontal: vw(14),
    borderColor: colors.green,
  },
  container: {
    width: '100%',
  },
  txt: {
    fontSize: 12,
    left: vw(44),
    bottom: vh(22),
    color: colors.green,
    alignSelf: 'center',
    paddingHorizontal: 3,
    position: 'absolute',
    backgroundColor: colors.white,
  },
  rightComponent: {
    right: vw(26),
    bottom: vh(30),
    position: 'absolute',
  }
});
