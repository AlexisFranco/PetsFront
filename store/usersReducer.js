import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_SERVER_URL } from '@env';
const SERVER_URL = REACT_NATIVE_SERVER_URL;

const USERS_LOADING = 'USERS_LOADING';
const USERS_SUCCESS = 'USERS_SUCCESS';

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
        navigation.navigate('Paseador', { id })

      dispatch({ type: USERS_SUCCESS });
    } catch(error) {
        alert('Intenta nuevamente ingresar');
    };
  };
};

export function getUser() {
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
      dispatch({ type: USERS_SUCCESS, payload: { client, pets: client.petIDs } });
    } catch(error) {
        alert('Intenta nuevamente ingresar');
    };
  };
};

const initialState = {
  client: {},
  pets: [],
  loading: false,
};

export function usersReducer(state = initialState, action) {
  switch(action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    default:
      return state;
  }
}
