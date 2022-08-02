import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../utils/colors';
import images from '../../utils/localImages';
import {strings} from '../../utils/common';
import TouchableImage from '../touchableImage';
import EditField from '../modal/editField';

const {width} = Dimensions.get('screen');
const ProfileField = ({fieldIcon, fieldName, fieldValue, callBack}: any) => {
  const [editField, setEditField] = React.useState(false);
  return (
    <View style={styles.infoContainer}>
      <Image source={fieldIcon} style={styles.fieldIcon} />
      <View style={styles.field}>
        <View style={styles.fieldHeading}>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>{fieldName}</Text>
          <TouchableOpacity
            style={{
              padding: 10,
            }}
            onPress={() => setEditField(true)}>
            <Image source={images.edit} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.text, {color: Colors.dark_grey}]}>
          {fieldValue}
        </Text>
        <View style={styles.line} />
      </View>
      {editField && <EditField fieldName={fieldName} setEditField={setEditField} callBack={callBack}/>}
    </View>
  );
};

export default ProfileField;

const styles = StyleSheet.create({
  field: {
    height: 80,
    justifyContent: 'center',
  },
  line: {
    height: 1,
    width: width,
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: Colors.green,
  },
  fieldIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  fieldHeading: {
    paddingRight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.black,
  },
  infoContainer: {
    width: width,
    paddingLeft: 80,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    marginVertical: 4,
    color: Colors.black,
  },
});
