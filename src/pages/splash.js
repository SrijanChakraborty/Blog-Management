import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resetandNavigate } from '../utils/navigationUtils';

const splash = () => {


  useEffect(() => {
    const timer = setTimeout(() => {
      resetandNavigate('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={style.safeArea}>
    <View style={style.container}>
      <View style={style.row}>
        <Animatable.Text
          animation="fadeInLeft"
          duration={1000}
          style={style.text}
        >
          Welcome
        </Animatable.Text>

        <Animatable.Text
          animation="fadeInDown"
          duration={1500}
          style={style.text}
        >
          {' '}to{' '}
        </Animatable.Text>

        <Animatable.Text
          animation="fadeInRight"
          duration={2000}
          style={style.text}
        >
          MyApp
        </Animatable.Text>
      </View>
    </View>
  </SafeAreaView>
  )
}

export default splash

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#007BFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },

})