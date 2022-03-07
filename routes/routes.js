import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../components/dashboard';
import Retrait from '../components/dashboard/retrait';
import Envoi from '../components/dashboard/envoi';
import Profil from '../components/dashboard/profil';
import Achater from '../components/dashboard/achat';
import Operation from '../components/dashboard/operation';
const Stack = createNativeStackNavigator();

const RoutesDash = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Retrait"
        component={Retrait}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Envoi"
        component={Envoi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profil"
        component={Profil}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Operation"
        component={Operation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Achater"
        component={Achater}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesDash;
