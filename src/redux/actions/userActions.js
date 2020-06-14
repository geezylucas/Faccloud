import axios from 'axios';
import {SET_USER, GET_SAT_INFORMATION} from '../constants';

// TODO: traer de inicio de sesion
export const saveUserFetch = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: data,
    });
  };
};

export const getSatInformationFetch = (idInfo) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://192.168.100.31:5000/api/satinformations/${idInfo}`,
      );
      dispatch({
        type: GET_SAT_INFORMATION,
        payload: response.data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
