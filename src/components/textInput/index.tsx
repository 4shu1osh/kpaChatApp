import React from 'react';
import colors from '../../utils/colors';
import {strings} from '../../utils/common';
import {vh, vw} from '../../utils/dimensions';
import {TextInput, StyleSheet} from 'react-native';

const CustomTextInput = (props: any) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);
  const _onFocus = () => {
    setIsFocused(true);
  };
  const _onBlur = () => {
    setIsFocused(false);
  };
  return (
    <TextInput
      {...props}
      ref={inputRef}
      onBlur={_onBlur}
      onFocus={_onFocus}
      placeholderTextColor={colors.grey}
      style={isFocused ? [styles.input ,styles.inputFocused] : styles.input}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    margin: 16,
    width: '90%',
    borderWidth: 1,
    height: vh(60),
    color: colors.white,
    paddingHorizontal: 10,
    borderBottomColor: colors.teal_green,
  },
  inputFocused: {
    borderRadius: 6,
    borderColor: colors.teal_green,
  },
});
