import axios from 'axios';
import {SET_USER, LOAD_USER_LOADING} from '../constants';

// TODO: traer de inicio de sesion
export const loginFetch = (email, password) => {
  return async (dispatch) => {
    dispatch({type: LOAD_USER_LOADING});

    const userState = {
      userData: {
        creationdate: {
          $date: 0,
        },
        email: '',
        lastname: '',
        name: '',
        phonenumber: '',
        satInfo: {
          rfc: '',
          settingsrfc: {
            timerautomatic: false,
            timerequest: 0,
            usocfdis: {},
          },
        },
      },
      userConfig: {
        typeuser: '', // TODO: Check this after feedback
        islogged: false,
        token: '',
      },
      error: null,
      loading: false,
    };
    try {
      let response = await axios.post(
        'http://192.168.100.31:5000/api/users/login',
        {
          email,
          password,
        },
      );
      userState.userConfig = {
        typeuser: 'p',
        islogged: true,
        token: response.data.data,
      };
      // Get user after login
      response = await axios.get('http://192.168.100.31:5000/api/users/', {
        headers: {
          Authorization: `Bearer ${userState.userConfig.token}`,
        },
      });
      userState.userData = response.data.data;
    } catch (error) {
      switch (error.response.status) {
        case 400:
        case 401:
          userState.error = error.response.data.message;
          break;
        default:
          userState.error = 'Ha ocurrido un error inesperado';
          break;
      }
      userState.userConfig = {
        typeuser: '', // TODO: Check this after feedback
        islogged: false,
        token: '',
      };
    } finally {
      dispatch({
        type: SET_USER,
        payload: userState,
      });
    }
  };
};
