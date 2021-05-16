import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_SERVER_URL } from '@env';
const SERVER_URL = REACT_NATIVE_SERVER_URL;

const MEDICINES_LOADING = 'MEDICINES_LOADING';
const MEDICINES_CREATED = 'MEDICINES_CREATED';

export function createMedicine(
  name,
  whatMedicine,
  dose,
  initHour,
  initDate,
  repetition,
  petID,
  navigation,
) {
  return async function (dispatch) {
    dispatch({ type: MEDICINES_LOADING });
    try {
      const token = await AsyncStorage.getItem('token');
      const { data: { medicine } } = await axios({
        method: 'POST',
        baseURL: SERVER_URL,
        url: 'medicines',
        data: {
          name,
          whatMedicine,
          dose,
          initHour,
          initDate,
          repetition,
          petID,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigation.navigate('Inicio');

      dispatch({ type: MEDICINES_CREATED, payload: medicine });
    } catch (error) {
      alert('Intenta nuevamente ingresar');
    }
  };
}

const initialState = {
  medicines: [],
  loading: false,
};

export function medicinesReducer(state = initialState, action) {
  switch (action.type) {
    case MEDICINES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MEDICINES_CREATED:
      return {
        ...state,
        medicines: [...state.medicines, action.payload],
      };
    default:
      return state;
  }
}
