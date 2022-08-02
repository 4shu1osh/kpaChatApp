import React from 'react';
import Colors from '../../utils/colors';
import routes from '../../routes/routeNames';
import images from '../../utils/localImages';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TouchableImage from '../../components/touchableImage';
import {screenWidth} from '../../utils/dimensions';
import {strings} from '../../utils/common';

const ImageView = ({route}: any) => {
  const {image} = route.params;
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeImg}
        onPress={() => {
          console.log('clicked');
          console.warn('call');
          navigation.goBack();
        }}>
          <Image source={images.back_arrow} style={styles.back} />
          <Text style={{color: Colors.white, fontSize: 20, fontWeight: '800', marginLeft: 10, bottom: 2}}>{strings.profile} </Text>
      </TouchableOpacity>
      <View style={{justifyContent: 'center', flex: 1}}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  closeImg: {
    width: 200,
    height: 20,
    marginTop: 50,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    width: 18,
    height: 18,
    padding: 20,
    resizeMode: 'contain',
  },
});
