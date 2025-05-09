import { View, Text, Dimensions, StyleSheet, TextInput, Platform, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import Toast from 'react-native-simple-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import { push, resetandNavigate } from '../../utils/navigationUtils';
import { AuthContext } from '../../context/authContext';

const login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = async () => {
    if (!email.trim()) {
      Toast.showWithGravity(
        'Please enter your email',
        Toast.LONG,
        Toast.BOTTOM,
      );
      emailInputRef.current.focus();
      return;
    } else if (!password.trim()) {
      Toast.showWithGravity(
        'Please enter your password',
        Toast.LONG,
        Toast.BOTTOM,
      );
      passwordInputRef.current.focus();
      return;
    }else{
       setLoading(true);
     try {
      await login(email, password);
      Toast.showWithGravity('Login successful!', Toast.LONG, Toast.BOTTOM);
      resetandNavigate('Home'); 
    } catch (error) {
      console.error("Error during login:", error);
      Toast.showWithGravity('Invalid credentials. Please try again.', Toast.LONG, Toast.BOTTOM); 
            setLoading(false);
    } finally {
        setLoading(false);
    }
    }
   

  };


  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.container}>
        <View style={style.loginBox}>
          <Text style={style.heading}>Login</Text>

          <TextInput
          ref={emailInputRef}
            style={style.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
             returnKeyType="next"
             onSubmitEditing={() => passwordInputRef.current?.focus()}
          />

          <View style={style.passwordContainer}>
            <TextInput
              style={style.passwordInput}
              ref={passwordInputRef}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
              returnKeyType="next"
              blurOnSubmit={true}
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={style.button} onPress={handleLogin}   >
            <Text style={style.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => push('SignUp')}>
          <Text style={style.signupText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
          
              </View>
 {loading && (
      <View style={style.fullScreenLoader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    )}

      </View>
    </SafeAreaView>
  );
};

export default login

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  loginBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#007BFF',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    color: '#007BFF',
    marginTop: 8,
    padding : 4,
    fontSize: 14,
    textAlign: 'center',
  },
 fullScreenLoader: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
},

})