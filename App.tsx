import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './scr/screens/Home/Home';


export default function App() {
  return (
    <>
     <StatusBar style="dark" backgroundColor='#242A32'/>
     <Home/>
    </>
  );
}