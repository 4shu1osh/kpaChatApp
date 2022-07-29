import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Colors from '../../utils/colors';
import {strings} from '../../utils/common';
import images from '../../utils/localImages';
import routes from '../../routes/routeNames';
import {vh, vw} from '../../utils/dimensions';
import storage from '@react-native-firebase/storage';
import {getUserDataAsync} from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import imagePickerFunction from '../../utils/imagePicker';
import LinearGradient from 'react-native-linear-gradient';
import TouchableImage from '../../components/touchableImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProfileField from '../../components/profileField';
import commonFunction from '../../utils/commonFunction';

const {width} = Dimensions.get('screen');

const Profile = () => {
  const [url, setUrl] = React.useState('');
  const [firestoreData, setFirestoreData] = React.useState<any>();
  const [profilePic, setProfilePic] = React.useState();
  const [userData, setUserData] = React.useState<any>();
  const [uploading, setUploading] = React.useState(false);
  const [settings, setSettings] = React.useState<any>(false);
  const [currTime, setCurrTime] = React.useState(new Date().getTime());

  const navigation = useNavigation<any>();

  React.useEffect(() => {
    getUserDataAsync().then(data => {
      setUserData(data);
      getFireStoreData(data.uid)
    });
  }, [profilePic, url]);

  const showSettings = () => {
    setSettings(!settings);
  };

  const showImage = () => {
    navigation.navigate(routes.imageView, {
      image: profilePic,
    });
  };

  const getFireStoreData = (docId: any) => {
    firestore()
      .collection('Users')
      .doc(docId)
      .get()
      .then(doc => {
        setFirestoreData(doc.data());
        console.log(doc.data());
      });
  }

  const logoutUser = () => {
    commonFunction.logOut(
      () => {
        navigation.navigate(routes.authStack);
        ToastAndroid.show(strings.logged_out, ToastAndroid.SHORT);
      },
      (error: string) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      },
    );
  };

  const deleteUser = () => {
    firestore()
      .collection('Users')
      .doc(userData?.uid)
      .delete()
      .then(() => {
        ToastAndroid.show(strings.user_deleted, ToastAndroid.SHORT);
        navigation.navigate(routes.authStack);
      })
      .catch(error => {
        ToastAndroid.show(strings.error, ToastAndroid.SHORT);
      });
  };

  const setImage = () => {
    setCurrTime(new Date().getTime());
    imagePickerFunction(200, 200, uploadImg);
  };

  const getUrl = async (reference: any) => {
    const uri = await reference.getDownloadURL();
    uri && setUrl(uri);
    uri &&
      firestore()
        .collection('Users')
        .doc(userData?.uid)
        .update({
          dp: uri,
        })
        .then(() => {
          console.log('DP------ updated!');
        })
        .catch(error => {
          console.log(error);
        });
  };

  const uploadImg = async (imgPath: any) => {
    setUploading(true);
    setProfilePic(imgPath);
    console.log('userdata', userData);
    const reference = storage().ref(`IMG_${currTime}.jpg`);

    const resp = await reference.putFile(imgPath);
    resp && getUrl(reference);

    if (resp.bytesTransferred / resp.totalBytes === 1) {
      setUploading(false);
      ToastAndroid.show(strings.profile_picture_updated, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        extraScrollHeight={40}
        keyboardDismissMode={'interactive'}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.scrollView}>
        <LinearGradient
          colors={[Colors.teal_green, Colors.green, Colors.blue]}
          style={styles.linearGradient}>
          <TouchableOpacity activeOpacity={0.8} onPress={showSettings} style={styles.settings}>
            <Image source={images.settings} style={styles.settingsIcon} />
          </TouchableOpacity>
          {settings && (
            <View style={styles.settingsContainer}>
              <TouchableOpacity onPress={logoutUser}>
                <Text style={styles.settingsText}>{strings.sign_out}</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity onPress={deleteUser}>
                <Text style={[styles.settingsText, {color: Colors.red}]}>
                  {strings.delete_user}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={showImage} style={styles.imgBg}>
            {firestoreData?.dp ? (
              <Image
                resizeMode={'cover'}
                source={{uri: firestoreData?.dp }}
                style={uploading ? [styles.img, {opacity: 0.6}] : styles.img}
              />
            ) : 
            // profilePic ? 
            // (
            //   <Image
            //     resizeMode={'cover'}
            //     source={{uri: profilePic }}
            //     style={uploading ? [styles.img, {opacity: 0.6}] : styles.img}
            //   />
            // )
            // :
            (
              <Image
                style={styles.img}
                resizeMode={'cover'}
                source={images.profile_pic}
              />
            )}
            {uploading && (
              <ActivityIndicator size="large" color={Colors.green} />
            )}

            <View style={styles.iconContainer}>
              <TouchableImage
                onPress={setImage}
                style={styles.icon}
                source={images.camera}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <ProfileField
          fieldName={strings.name}
          fieldIcon={images.person}
          fieldValue={userData?.name ? userData?.name : strings.add_name}
        />

        <ProfileField
          fieldIcon={images.email}
          fieldName={strings.email}
          fieldValue={userData?.email ? userData?.email : strings.add_email}
        />
        <ProfileField
          fieldIcon={images.dialpad}
          fieldName={strings.phone_number}
          fieldValue={userData?.phone ? userData?.phone : strings.add_phone}
        />
        <ProfileField
          fieldName={strings.bio}
          fieldIcon={images.documents}
          fieldValue={userData?.bio ? userData?.bio : strings.bio_placeholder}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  scrollView: {
    alignItems: 'center',
  },
  imgBg: {
    padding: 1,
    marginTop: 80,
    width: 130,
    height: 130,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.green,
    backgroundColor: Colors.light_grey,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    position: 'absolute',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: Colors.green,
  },

  pencil: {
    width: 20,
    height: 20,
    tintColor: Colors.black,
  },
  iconContainer: {
    right: 0,
    bottom: 0,
    width: 46,
    height: 46,
    borderWidth: 2,
    borderRadius: 50,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    borderColor: Colors.green,
    backgroundColor: Colors.black,
  },
  loader: {
    zIndex: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
    marginBottom: vh(30),
    justifyContent: 'center',
  },

  linearGradient: {
    height: 300,
    width: width,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  infoContainer: {
    width: width,
    paddingLeft: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    fontSize: 30,
    marginRight: 20,
    color: Colors.white,
  },
  editField: {
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  settings: {
    top: 40,
    right: 0,
    zIndex: 1,
    padding: 20,
    position: 'absolute',
  },
  settingsIcon: {
    width: 20,
    height: 20,
  },
  settingsContainer: {
    top: 60,
    zIndex: 1,
    right: 50,
    width: 160,
    height: 80,
    position: 'absolute',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius:10,
    backgroundColor: Colors.white,
  },
  settingsText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.black,
  },
  divider: {
    height: 1,
    marginVertical: 10,
    backgroundColor: Colors.grey,
  }
});
