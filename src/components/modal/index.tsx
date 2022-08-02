import {Text, View, Image, Modal, StyleSheet} from 'react-native';
import React from 'react';
import CustomButton from '../button';
import Colors from '../../utils/colors';
import {strings} from '../../utils/common';
import images from '../../utils/localImages';
import { screenHeight, screenWidth } from '../../utils/dimensions';

const CustomModal = (props: any) => {
  const {showModal, buttonHandler} = props;

  const [visible, setVisible] = React.useState(showModal);

  const hideModal = () => setVisible(false);

  return (
    <Modal transparent={true} visible={visible} onDismiss={hideModal}>
      <View style={styles.modal}>
      <View style={styles.rectangle}>
        <Image source={images.edit} style={styles.icon} />
        <Text style={[styles.text, {fontSize: 18, fontWeight: '900'}]}>
          {strings.complete_your_profile}
        </Text>
        <Text style={styles.text}>{strings.complete_your_profile}</Text>
        <View style={styles.buttonView}>
          <CustomButton
            buttonHandler={buttonHandler}
            label={strings.edit_profile}
          />
        </View>
      </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    marginVertical: 7,
    color: Colors.black,
    textAlign: 'center',
  },
  rectangle: {
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
  icon: {
    width: 30,
    height: 30,
    marginVertical: 20,
    alignSelf: 'center',
  },
  modal: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  
});
