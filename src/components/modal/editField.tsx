import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/colors';
import {screenWidth} from '../../utils/dimensions';

const EditField = ({setEditField}: any) => {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={{flex: 1, flexDirection: 'column-reverse'}}>
        <View style={styles.modal}>
          <Text style={styles.text}>Edit Field</Text>
          <TextInput
            autoFocus={true}
            style={styles.input}
            keyboardAppearance="light"
            keyboardType="ascii-capable"
            placeholderTextColor={Colors.black}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setEditField(false)}
              style={styles.button}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditField(false)}
              style={styles.button}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditField;

const styles = StyleSheet.create({
  modal: {
    height: 150,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.white,
    textTransform: 'uppercase',
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 10,
    color: Colors.black,
    paddingHorizontal: 10,
    borderColor: Colors.green,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
