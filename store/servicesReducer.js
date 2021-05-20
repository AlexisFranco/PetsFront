import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_SERVER_URL } from '@env';
const SERVER_URL = REACT_NATIVE_SERVER_URL;

const SERVICES_LOADING = 'SERVICES_LOADING';
const SERVICES_SUCCESS = 'SERVICES_SUCCESS';
const SERVICES_UPDATED = 'SERVICES_UPDATED';
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

export function getServices(idWalker='') {
  return async function(dispatch) {
    dispatch({ type: SERVICES_LOADING})
    try {
      const { data: { services } } = await axios({
        method: 'GET',
        baseURL: SERVER_URL,
        url: `/services?${idWalker}`,
      });
      dispatch({ type: SERVICES_SUCCESS, payload: services })
    } catch(error) {
        alert('Intenta nuevamente ingresar');
        navigation.navigate('Ingreso');
        await AsyncStorage.removeItem('token');
    };
  };
};

export function updateService(status, _id, serviceIndex) {
  return async function (dispatch) {
    dispatch({ type: SERVICES_LOADING });
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { serviceUpdate } } = await axios({
        method: 'PUT',
        baseURL: SERVER_URL,
        url: `services/${_id}`,
        data: status,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: SERVICES_UPDATED, payload: serviceUpdate, serviceIndex });
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
    case SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload,
      };
    case SERVICES_CREATED:
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    case SERVICES_UPDATED:
      return {
        ...state,
        services: state.services.map((service, index) => {
          return (
            action.serviceIndex === index ?
              action.payload
            :
              service
          )
        })
      };
    default:
      return state;
  }
}
