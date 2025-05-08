import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/pages/splash';
import Login from './src/pages/auth/login';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/pages/home';
import Navigation from './src/navigation/navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <Navigation/>
  );
}