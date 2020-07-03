import axios from 'axios';
import {SET_USER, GET_SAT_INFORMATION} from '../constants';

// TODO: traer de inicio de sesion
export const loginFetch = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://192.168.100.31:5000/api/users/login',
        {
          email,
          password,
        },
      );
      let userState = {
        satinformation: {
          _id: {$oid: ''},
          rfc: '',
          settingsrfc: {
            timerautomatic: false,
            timerequest: 0,
            usocfdis: {},
          },
        },
        user: {
          typeuser: '',
          islogged: false,
          token: '',
          name: '',
          userId: {$oid: ''},
          error: null,
        },
      };
      if (response.data.status !== 'error') {
        userState.user = {
          name: response.data.data.name,
          typeuser: 'p',
          islogged: true,
          token: response.data.data.token,
          userId: {
            $oid: response.data.data.userId.$oid,
          },
        };
        userState.satinformation = response.data.data.sat_info;
      } else {
        userState.user.error = 'Email o contraseña incorrectos';
      }
      dispatch({
        type: SET_USER,
        payload: userState,
      });
    } catch (error) {
      console.log(error);
    }
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
