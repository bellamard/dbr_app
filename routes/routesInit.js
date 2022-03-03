import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {launch} from '../components/Launch';
import {signIn} from '../components/Singin';
import {logIn} from '../components/Login';
const Stack = createNativeStackNavigator();

const routesInit = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="launch"
        component={launch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="logIn"
        component={logIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signIn"
        component={signIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default routesInit;
