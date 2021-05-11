import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Login from './screens/login';
import Client from './screens/client';
import InformationPet from './screens/informationPet';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Ingreso' component={Login}/>
        <Stack.Screen name='Inicio' component={Client}/>
        <Stack.Screen name='Información' component={InformationPet}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
