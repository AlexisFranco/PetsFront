import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_SERVER_URL } from '@env';
const SERVER_URL = REACT_NATIVE_SERVER_URL;

const PETS_LOADING = 'PETS_LOADING';
const PETS_SUCCESS = 'PETS_SUCCESS';
const PETS_CREATED = 'PETS_CREATED';

export function getPets() {
  return async function (dispatch) {
    dispatch({ type: PETS_LOADING });
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { pets } } = await axios({
        method: 'GET',
        baseURL: SERVER_URL,
        url: '/pets',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: PETS_SUCCESS, payload: pets });
    } catch (error) {
      alert('Intenta nuevamente ingresar');
    }
  };
}

export function createPet(name, whatPet, dateBirth, weight, idealWeight, breed, navigation) {
  return async function (dispatch) {
    dispatch({ type: PETS_LOADING });
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { pet } } = await axios({
        method: 'POST',
        baseURL: SERVER_URL,
        url: 'pets',
        data: {
          name,
          whatPet,
          dateBirth,
          weight,
          idealWeight,
          breed,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigation.navigate('Inicio');

      dispatch({ type: PETS_CREATED, payload: pet });
    } catch (error) {
      alert('Intenta nuevamente ingresar');
    }
  };
}

const initialState = {
  pets: [],
  loading: false,
};

export function petsReducer(state = initialState, action) {
  switch (action.type) {
    case PETS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PETS_SUCCESS:
      return {
        ...state,
        loading: false,
        pets: action.payload,
      };
    case PETS_CREATED:
      return {
        ...state,
        pets: [...state.pets, action.payload],
      };
    default:
      return state;
  }
}
