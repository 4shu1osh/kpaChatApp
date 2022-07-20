import React from 'react';
import routes from './routeNames';
import Login from '../screens/login';
import SplashScreen from '../screens/splashscreen';
import TermsAndCondition from '../screens/termsAndCondition';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChoosePassword from '../screens/login/choosePassword';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
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
        <Stack.Screen name={routes.termsAndCondition} component={TermsAndCondition} />
        <Stack.Screen name={routes.login} component={Login} />
        <Stack.Screen name={routes.password} component={ChoosePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
