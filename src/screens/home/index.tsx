import React from 'react';
import Colors from '../../utils/colors';
import routes from '../../routes/routeNames';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/button';
import commonFunction from '../../utils/commonFunction';
import firestore from '@react-native-firebase/firestore';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {getUserDataAsync, removeUserDataAsync} from '../../utils/storage';
import { strings, toUpperCase } from '../../utils/common';

const Home = () => {
  const navigation = useNavigation<any>();
  const [userData, setUserData] = React.useState({
    uid: '',
    email: '',
  });

  React.useEffect(() => {
    getUserDataAsync().then(data => {
      setUserData(data);
      firestore()
      .collection('Users')
      .doc(data.uid)
      .set({
        email: data.email,
        id: data.uid,
      })
      .then(() => {
        console.log('User added!');
      });
    
    });
  }, []);

  const buttonHandler1 = () => {
      // update email
        firestore()
        .collection('Users')
        .doc(userData.uid)
        .update({
            email: 'newmail@gmail.com',
        })
        .then(() => {
            console.log('User updated!');
        }
        )
        .catch(error => {
            console.log(error);
        }
        );
  }

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
  }

  const buttonHandler3 = () => {
    firestore()
    .collection('Users')
    .doc(userData.uid)
    .delete()
    .then(() => {
      console.log('User deleted!');
    });
    }

 
  return (
    <View style={styles.container}>
      <Text style={styles.item}>{userData?.uid}</Text>
      <Text style={styles.item}>{userData?.email}</Text>
      <CustomButton
        label={toUpperCase(strings.update_email)}
        buttonHandler={buttonHandler1}
      />
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
});
