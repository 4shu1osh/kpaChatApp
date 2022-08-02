import React from 'react';
import Colors from '../../utils/colors';
import { vh } from '../../utils/dimensions';
import routes from '../../routes/routeNames';
import CustomModal from '../../components/modal';
import CustomButton from '../../components/button';
import storage from '@react-native-firebase/storage';
import commonFunction from '../../utils/commonFunction';
import {strings, toUpperCase} from '../../utils/common';
import firestore from '@react-native-firebase/firestore';
import imagePickerFunction from '../../utils/imagePicker';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {getUserDataAsync, removeUserDataAsync, setUserDataAsync} from '../../utils/storage';
const Home = () => {
  const [userData, setUserData] = React.useState({
    dp: '',
    uid: '',
    name: '',
    email: '',
    phone: '',
  });

  React.useEffect(() => {
    // getUserDataAsync().then(data => {
    //   setUserData(data);
    //   firestore()
    //     .collection('Users')
    //     .doc(data.uid)
    //     .set({
    //       dp: '',
    //       name: data.name,
    //       phone: data.phone,
    //       email: data.email,
    //     })
    //     .then(() => {
    //       setUserDataAsync(data);
    //       console.log('User added!');
    //     });
    // });
  }, []);
  
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
      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  // item: {
  //   padding: 10,
  //   fontSize: 18,
  //   height: 44,
  //   color: Colors.black,
  // },
  // loader: {
  //   width: '94%',
  //   height: vh(60),
  //   borderRadius: 6,
  //   alignItems: 'center',
  //   marginBottom: vh(30),
  //   justifyContent: 'center',
  //   backgroundColor: Colors.green,
  // }
});
