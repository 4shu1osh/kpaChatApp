import React from 'react';
import routes from './routeNames';
import Home from '../screens/home';
import Login from '../screens/login';
import Inbox from '../screens/inbox';
import Colors from '../utils/colors';
import {StatusBar} from 'react-native';
import Signup from '../screens/signup';
import SplashScreen from '../screens/splashscreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar 
        translucent={true}
        barStyle="light-content"
        backgroundColor={Colors.transparent}
       />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.splash} component={SplashScreen} />
        <Stack.Screen name={routes.authStack} component={AuthStack} />
        <Stack.Screen name={routes.chatStack} component={ChatStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={routes.login} component={Login} />
      <Stack.Screen name={routes.signup} component={Signup} />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={routes.home} component={Home} />
      <Stack.Screen name={routes.inbox} component={Inbox} />
    </Stack.Navigator>
  );
}
