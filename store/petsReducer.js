import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_SERVER_URL } from '@env';
const SERVER_URL = REACT_NATIVE_SERVER_URL;

const PETS_LOADING = 'PETS_LOADING';
const PETS_SUCCESS = 'PETS_SUCCESS';
const PET_SUCCESS = 'PET_SUCCESS';
const PET_UPDATED = 'PET_UPDATED';
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
      alert('Intenta más tarde');
    }
  };
}

export function getPet(petID) {
  return async function (dispatch) {
    dispatch({ type: PETS_LOADING });
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { pet } } = await axios({
        method: 'GET',
        baseURL: SERVER_URL,
        url: `/pets/${petID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: PET_SUCCESS, payload: pet });
    } catch (error) {
      alert('Intenta más tarde');
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

export function updatePet(data, indexPet) {
  return async function(dispatch) {
    dispatch({ type: PETS_LOADING})
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { petUpdate } } = await axios({
        method: 'PUT',
        baseURL: SERVER_URL,
        url: '/pets',
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: PET_UPDATED, payload: petUpdate, indexPet });
    } catch(error) {
        alert('Intenta más tarde');
    };
  };
};

const initialState = {
  pets: [],
  pet: {},
  loading: false,
};

export function petsReducer(state = initialState, action) {
  switch (action.type) {
    case PETS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PET_SUCCESS:
      return {
        ...state,
        loading: false,
        pet: action.payload,
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
    case PET_UPDATED:
      return {
        ...state,
        loading: false,
        pet: action.payload,
        pets: state.pets.map((pet, index) => {
          return action.indexPet === index ? action.payload : pet;
        }),
      };
    default:
      return state;
  }
}
