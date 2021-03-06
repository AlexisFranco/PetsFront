import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import PhotoHeaderClient from './components/PhotoHeaderClient';

import Login from './screens/Login';
import Client from './screens/Client';
import Walker from './screens/Walker';
import Register from './screens/Register';
import RequestWalk from './screens/RequestWalk';
import ServicesWalker from './screens/ServicesWalker';
import InformationPet from './screens/InformationPet';
import InformationWalks from './screens/InformationWalks';
import InformationClient from './screens/InformationClient';
import InformationMedicine from './screens/InformationMedicine';
import CreatePet from './screens/CreatePet';
import CreateMedicine from './screens/CreateMedicine';
import CreateService from './screens/CreateService';
import { Provider } from 'react-redux';
import { store } from './store'
import PhotoHeaderWalker from './components/PhotoHeaderWalker';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Ingreso"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registro"
            component={Register}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Inicio"
            component={Client}
            options={{
              headerRight: () => <PhotoHeaderClient />,
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Servicios"
            component={ServicesWalker}
            options={{
              headerRight: () => <PhotoHeaderWalker />,
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Crear Mascota"
            component={CreatePet}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Crear Paseo"
            component={CreateService}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Crear Medicina"
            component={CreateMedicine}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Mascota"
            component={InformationPet}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Medicinas"
            component={InformationMedicine}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Paseos"
            component={InformationWalks}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Paseadores"
            component={RequestWalk}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Informaci??n"
            component={InformationClient}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen
            name="Paseador"
            component={Walker}
            options={{
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
