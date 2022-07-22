import React from 'react';
import routes from './routeNames';
import Login from '../screens/login';
import Signup from '../screens/signup';
import {StatusBar} from 'react-native';
import SplashScreen from '../screens/splashscreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          options={{
            gestureEnabled: false,
          }}
          name={routes.splash}
          component={SplashScreen}
        />
        <Stack.Screen name={routes.login} component={Login} />
        <Stack.Screen name={routes.signup} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
