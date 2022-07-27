import React from 'react';
import Colors from '../../utils/colors';
import routes from '../../routes/routeNames';
import CustomButton from '../../components/button';
import storage from '@react-native-firebase/storage';
import commonFunction from '../../utils/commonFunction';
import {strings, toUpperCase} from '../../utils/common';
import firestore from '@react-native-firebase/firestore';
import imagePickerFunction from '../../utils/imagePicker';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {getUserDataAsync, removeUserDataAsync} from '../../utils/storage';
import { vh } from '../../utils/dimensions';

const Home = () => {
  const [userData, setUserData] = React.useState({
    uid: '',
    email: '',
    dp: '',
  });
  const navigation = useNavigation<any>();
  const [img, setImg] = React.useState();
  const [url, setUrl] = React.useState('');
  const [isUploaded, setIsUploaded] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [currTime, setCurrTime] = React.useState(new Date().getTime());

  const imgCallback = (imgPath: any) => {
  setUploading(true);
   imgUpload(imgPath);
   setCurrTime(new Date().getTime());
  }

  const getUrl = async (reference: any) => {
    const uri = await reference.getDownloadURL();
    uri && setUrl(uri);
  }

  const imgUpload = async (imgPath: any)=> {
    
    const reference = storage().ref(`Img${currTime}.JPG`);
    const pathToFile = `${imgPath}`;
    console.log(pathToFile);
    const resp = await reference.putFile(pathToFile);
    resp && getUrl(reference)
    setUploading(true)
    if(resp.bytesTransferred/resp.totalBytes === 1) {
      setUploading(false)
      setIsUploaded("Uploaded!")
    }
  }

  React.useEffect(()=> {
    firestore()
    .collection('Users')
    .doc(userData.uid)
    .update({
      dp: url,
    })
    .then(() => {
      console.log('DP updated!');
    })
    .catch(error => {
      console.log(error);
    });
  }, [url])

  React.useEffect(() => {
    getUserDataAsync().then(data => {
      setUserData(data);
      firestore()
        .collection('Users')
        .doc(data.uid)
        .set({
          email: data.email,
          id: data.uid,
          dp: ''
        })
        .then(() => {
          console.log('User added!');
        });
    });
  }, []);

  const buttonHandler1 = () => {
    firestore()
      .collection('Users')
      .doc(userData.uid)
      .update({
        email: 'newmail@gmail.com',
      })
      .then(() => {
        console.log('User updated!');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const buttonHandler2 = () => {
    commonFunction.logOut(
      (success: any) => {
        console.log(success);
        removeUserDataAsync();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: routes.authStack}],
          }),
        );
      },
      (error: any) => {
        console.log(error);
      },
    );
  };

  const buttonHandler3 = () => {
    firestore()
      .collection('Users')
      .doc(userData.uid)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };

  const buttonHandler4 = async () => {
    setIsUploaded('');
    imagePickerFunction(200, 200, imgCallback);
  };

  return (
    <View style={styles.container}>
      <Text>{isUploaded}</Text>
      <Text style={styles.item}>{userData?.uid}</Text>
      <Text style={styles.item}>{userData?.email}</Text>
      <CustomButton
        label={toUpperCase(strings.update_email)}
        buttonHandler={buttonHandler1}
      />
      {
        uploading ?
        <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.white}  />
      </View>
      :
      <CustomButton
      label={toUpperCase(strings.update_profile_picture)}
      buttonHandler={buttonHandler4}
    />
      }
     
      <CustomButton
        label={toUpperCase(strings.delete_user)}
        buttonHandler={buttonHandler3}
      />
      <CustomButton
        label={toUpperCase(strings.sign_out)}
        buttonHandler={buttonHandler2}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: Colors.black,
  },
  loader: {
    width: '94%',
    height: vh(60),
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: vh(26),
    justifyContent: 'center',
    backgroundColor: Colors.green,
  }
});
