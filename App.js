import 'react-native-gesture-handler';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import React from 'react';

import FirstScreen from './src/Components/FirstScreenComponent/FirstScreen'
import LoginScreen from './src/Components/LoginScreenComponent/LoginScreen'
import Register from './src/Components/RegisterComponent/Register'
import ForgotPass from './src/Components/ForgotPasswordComponent/ForgotPass'

import AppTabsScreen from './src/Components/AppTabsScreenComponent/AppTabsScreen'
import { createStackNavigator } from '@react-navigation/stack'

import { Image } from 'react-native';





const Stack = createStackNavigator()


function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./src/Commons/LOGO.png')}
    />
  )
}
class App extends React.Component {




  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='First'>
          <Stack.Screen
            name="First"
            component={FirstScreen}
            options={{
              headerTitle: props => <LogoTitle {...props} />,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#222223' }
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: props => <LogoTitle {...props} />,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#222223',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="MainPage"
            component={AppTabsScreen}
            options={{
              headerTitle: props => <LogoTitle {...props} />,
              headerTitleAlign: 'center',
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#222223',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerTitle: props => <LogoTitle {...props} />,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#222223',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="ForgotPass"
            component={ForgotPass}
            options={{
              headerTitle: props => <LogoTitle {...props} />,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#222223',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}


export default App;
