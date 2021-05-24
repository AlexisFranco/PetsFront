import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import PhotoHeaderClient from './components/PhotoHeaderClient';

import Login from './screens/Login';
import Client from './screens/Client';
import Walker from './screens/Walker';
import Register from './screens/Register';
import InformationPet from './screens/informationPet';
import InformationWalks from './screens/InformationWalks';
import InformationClient from './screens/informationClient';
import RequestWalker from './screens/requestWalker';
import InformationMedicine from './screens/informationMedicine';
import CreatePet from './screens/createPet';
import CreateMedicine from './screens/createMedicine';
import CreateService from './screens/createService';
import { Provider } from 'react-redux';
import { store } from './store'
import PhotoHeaderWalker from './components/PhotoHeaderWalker';
import ServiceWalker from './screens/serviceWalker';

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
            component={ServiceWalker}
            options={{
              headerRight: () => <PhotoHeaderWalker />,
              headerStyle: {
                backgroundColor: '#F3F2DC',
              },
            }}
          />
          <Stack.Screen name="Crear Mascota" component={CreatePet} />
          <Stack.Screen name="Crear Paseo" component={CreateService} />
          <Stack.Screen name="Crear Medicina" component={CreateMedicine} />
          <Stack.Screen name="Mascota" component={InformationPet} />
          <Stack.Screen name="Medicinas" component={InformationMedicine} />
          <Stack.Screen name="Paseos" component={InformationWalks} />
          <Stack.Screen name="Paseadores" component={RequestWalker} />
          <Stack.Screen name="Información" component={InformationClient} />
          <Stack.Screen name="Paseador" component={Walker} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
