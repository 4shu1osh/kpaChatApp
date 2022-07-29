import React from 'react';
import Routes from './src/routes';
import {LogBox} from 'react-native';
import Profile from './src/screens/profile';
import AnimatingImage from './src/screens/animatingimage';


LogBox.ignoreAllLogs();

export default function App() {
  return <Routes/>
}
