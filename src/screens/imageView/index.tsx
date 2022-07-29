import React from 'react';
import Colors from '../../utils/colors';
import routes from '../../routes/routeNames';
import images from '../../utils/localImages';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TouchableImage from '../../components/touchableImage';

const ImageView = ({route}: any) => {
  const image1 = route.params.image;
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
      </TouchableOpacity>
      <View style={{justifyContent: 'center', flex: 1}}>
        <Image source={{uri: image1}} style={styles.image} />
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
    width: 300,
    height: 300,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  closeImg: {
    width: 20,
    height: 20,
    marginTop: 50,
    marginLeft: 20,
  },
  back: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
