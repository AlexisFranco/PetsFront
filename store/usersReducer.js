import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_SERVER_URL } from '@env';
import { Alert } from 'react-native';

const SERVER_URL = REACT_NATIVE_SERVER_URL;
const USERS_LOADING = 'USERS_LOADING';
const USERS_SUCCESS = 'USERS_SUCCESS';
const USERS_UPDATED = 'USERS_UPDATED';
const USERS_CLIENT_SUCCESS = 'USERS_CLIENT_SUCCESS';
const USERS_WALKER_SUCCESS = 'USERS_WALKER_SUCCESS';
const USERS_WALKERS_SUCCESS = 'USERS_WALKERS_SUCCESS';
const USERS_LOG_OUT = 'USERS_LOG_OUT'

export function createUser(
  name,
  email,
  password,
  phoneNum,
  selectedTypeUser,
  navigation
) {
  return async function (dispatch) {
    dispatch({ type: USERS_LOADING });
    try {
      const { data: { token, userType, userID } } = await axios({
        method: 'POST',
        baseURL: SERVER_URL,
        url: `/${selectedTypeUser}`,
        data: {
          name,
          email,
          password,
          phoneNum,
        },
      });
      AsyncStorage.setItem('token', token);

      userType === 'client'
        ? navigation.navigate('Inicio')
        : navigation.navigate('Servicios', { id: userID });

      dispatch({ type: USERS_SUCCESS });
    } catch (error) {
      Alert.alert('Oops!','Intenta nuevamente registrarte');
    }
  };
};

export function loginUser(email, password, navigation) {
  return async function(dispatch) {
    dispatch({ type: USERS_LOADING})
    try {
      const { data: { token, userType, id } } = await axios({
        method: 'POST',
        baseURL: SERVER_URL,
        url: '/users/signin',
        data: {
          email,
          password,
        },
      });
      AsyncStorage.setItem('token', token);

      userType === 'client'?
        navigation.navigate('Inicio')
        :
        navigation.navigate('Servicios', { id })

      dispatch({ type: USERS_SUCCESS, payload: userType });
    } catch(error) {
        Alert.alert(
          'Oops!',
          'Usuario o contraseña incorrectos, intenta nuevamente.',
          [
            { text: 'Cerrar' }
          ]
        );
    };
  };
};

export function updateClient(data) {
  return async function(dispatch) {
    dispatch({ type: USERS_LOADING})
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { clientUpdate } } = await axios({
        method: 'PUT',
        baseURL: SERVER_URL,
        url: '/clients',
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: USERS_UPDATED, payload: { client: clientUpdate } });
    } catch(error) {
        alert('Intenta nuevamente ingresar');
    };
  };
};

export function updateWalker(data) {
  return async function(dispatch) {
    dispatch({ type: USERS_LOADING})
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { walkerUpdate } } = await axios({
        method: 'PUT',
        baseURL: SERVER_URL,
        url: '/walkers',
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: USERS_UPDATED, payload: { walker: walkerUpdate } });
    } catch(error) {
        alert('Intenta nuevamente ingresar');
    };
  };
};

export function getClient() {
  return async function(dispatch) {
    dispatch({ type: USERS_LOADING})
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { client } } = await axios({
        method: 'GET',
        baseURL: SERVER_URL,
        url: '/clients',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: USERS_CLIENT_SUCCESS, payload: { client, pets: client.petIDs } });
    } catch(error) {
        alert('Intenta nuevamente ingresar');
    };
  };
};

export function getWalkers(idWalker='') {
  return async function(dispatch) {
    dispatch({ type: USERS_LOADING})
    try {
      const { data: { walkers } } = await axios({
        method: 'GET',
        baseURL: SERVER_URL,
        url: `/walkers?${idWalker}`,
      });
      walkers.length === 1
        ? dispatch({
            type: USERS_WALKER_SUCCESS,
            payload: { walker: walkers[0] },
          })
        : dispatch({
            type: USERS_WALKERS_SUCCESS,
            payload: walkers
          });
    } catch(error) {
        alert('Intenta nuevamente ingresar');
        navigation.navigate('Ingreso');
        await AsyncStorage.removeItem('token');
    };
  };
};

export function logUserOut(){
  return {
    type: USERS_LOG_OUT,
  };
};

const initialState = {
  client: {},
  walker: {},
  walkers: [],
  userType: '',
  pets: [],
  loading: false,
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userType: action.payload,
      };
    case USERS_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case USERS_UPDATED:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case USERS_WALKER_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case USERS_WALKERS_SUCCESS:
      return {
        ...state,
        loading: false,
        walkers: action.payload,
      };
    case USERS_LOG_OUT:
      return {
        client: {},
        walker: {},
        walkers: [],
        userType: '',
        pets: [],
        loading: false,
      };
    default:
      return state;
  }
}
