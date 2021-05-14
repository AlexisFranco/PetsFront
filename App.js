import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import Login from './screens/login';
import Client from './screens/client';
import Walker from './screens/walker';
import Register from './screens/register';
import InformationPet from './screens/informationPet';
import InformationClient from './screens/informationClient';
import InformationWalker from './screens/informationWalker';
import InformationMedicine from './screens/informationMedicine';
import CreatePet from './screens/createPet';
import CreateMedicine from './screens/createMedicine';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Ingreso' component={ Login }/>
        <Stack.Screen name='Registro' component={ Register }/>
        <Stack.Screen name='Inicio' component={ Client }/>
        <Stack.Screen name='Información' component={ InformationClient }/>
        <Stack.Screen name='Paseador' component={ Walker }/>
        <Stack.Screen name='Mascota' component={ InformationPet }/>
        <Stack.Screen name='Crear Mascota' component={ CreatePet }/>
{/*         <Stack.Screen name='Crear Medicina' component={ CreateMedicine }/> */}
        <Stack.Screen name='Medicinas' component={ InformationMedicine }/>
        <Stack.Screen name='Paseadores' component={ InformationWalker }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
