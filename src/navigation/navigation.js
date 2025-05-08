import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import login from '../pages/auth/login';
import { navigationRef } from '../utils/navigationUtils';
import splash from '../pages/splash';
import home from '../pages/home';
import signup from '../pages/auth/signup';


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={splash} />
          <Stack.Screen
            options={{
              animation: 'fade',
            }}
            name="Login"
            component={login}
          />
          <Stack.Screen
            options={{
              animation: 'fade',
            }}
            name="Home"
            component={home}
          />
            <Stack.Screen
            options={{
              animation: 'fade',
            }}
            name="SignUp"
            component={signup}
          />
        </Stack.Navigator>
        
      </NavigationContainer>


      
    );
  };
  
  export default Navigation;