import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_SERVER_URL } from '@env';
const SERVER_URL = REACT_NATIVE_SERVER_URL;

const SERVICES_LOADING = 'SERVICES_LOADING';
const SERVICES_CREATED = 'SERVICES_CREATED';

export function createService(
  initLoc,
  time,
  cost,
  hour,
  date,
  petID,
  walkerID,
  navigation
) {
  return async function (dispatch) {
    dispatch({ type: SERVICES_LOADING });
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { service } } = await axios({
        method: 'POST',
        baseURL: SERVER_URL,
        url: 'services',
        data: {
          initLoc,
          time,
          cost,
          hour,
          date,
          petID,
          walkerID,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigation.navigate('Inicio');

      dispatch({ type: SERVICES_CREATED, payload: service });
    } catch (error) {
      alert('Intenta nuevamente ingresar');
    }
  };
}

const initialState = {
  services: [],
  loading: false,
};

export function servicesReducer(state = initialState, action) {
  switch (action.type) {
    case SERVICES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SERVICES_CREATED:
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    default:
      return state;
  }
}
