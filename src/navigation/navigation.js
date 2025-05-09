import React, { useState, useEffect, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import Splash from '../pages/splash';
import Login from '../pages/auth/login';
import Home from '../pages/home';
import AddBlog from '../pages/addBlog';
import signup from '../pages/auth/signup';
import { navigationRef } from '../utils/navigationUtils';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isLogin, loading } = useContext(AuthContext);
  const [isSplashVisible, setSplashVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false); 
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);
  if (loading || isSplashVisible) {
    return <Splash />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <>
            <Stack.Screen
              options={{
                animation: 'fade',
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{
                animation: 'fade',
              }}
              name="AddBlog"
              component={AddBlog}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                animation: 'fade',
              }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{
                animation: 'fade',
              }}
              name="SignUp"
              component={signup}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
