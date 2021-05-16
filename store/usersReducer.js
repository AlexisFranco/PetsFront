import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_SERVER_URL } from '@env';
const SERVER_URL = REACT_NATIVE_SERVER_URL;

const USERS_LOADING = 'USERS_LOADING';
const USERS_SUCCESS = 'USERS_SUCCESS';
const USERS_CLIENT_SUCCESS = 'USERS_CLIENT_SUCCESS';
const USERS_WALKER_SUCCESS = 'USERS_WALKER_SUCCESS';
const USERS_WALKERS_SUCCESS = 'USERS_WALKERS_SUCCESS';


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
      const { data: { token, userType, id } } = await axios({
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
        : navigation.navigate('Paseador', { id });

      dispatch({ type: USERS_SUCCESS });
    } catch (error) {
      alert('Intenta nuevamente ingresar');
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
        navigation.navigate('Paseador', { id })

      dispatch({ type: USERS_SUCCESS });
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

export function getWalker(idWalker) {
  return async function(dispatch) {
    dispatch({ type: USERS_LOADING})
    try {
      const { data: { walkers } } = await axios({
        method: 'GET',
        baseURL: SERVER_URL,
        url: `/walkers?_id=${idWalker}`,
      });

      dispatch({
        type: USERS_WALKER_SUCCESS,
        payload: { walker: walkers[0] },
      });
    } catch(error) {
        alert('Intenta nuevamente ingresar');
    };
  };
};

export function getWalkers() {
  return async function(dispatch) {
    dispatch({ type: USERS_LOADING})
    try {
      const { data: { walkers } } = await axios({
        method: 'GET',
        baseURL: SERVER_URL,
        url: '/walkers',
      });

      dispatch({ type: USERS_WALKERS_SUCCESS, payload: walkers });
    } catch(error) {
        alert('Intenta nuevamente ingresar');
    };
  };
};

const initialState = {
  client: {},
  walker: {},
  walkers: [],
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
      };
    case USERS_CLIENT_SUCCESS:
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
        ...action.payload,
      };
    default:
      return state;
  }
}
