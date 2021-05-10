import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Login from './screens/login';
import Client from './screens/client';

const Stack = createStackNavigator();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Ingreso' component={Login}/>
        <Stack.Screen name='Inicio' component={Client}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
