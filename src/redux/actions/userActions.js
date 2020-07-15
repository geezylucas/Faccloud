import axios from 'axios';
import {SET_USER, LOAD_USER_LOADING} from '../constants';
import {logout} from '../reducers/rootReducer';

export const loginFetch = (email, password) => {
  return async (dispatch) => {
    dispatch({type: LOAD_USER_LOADING});

    const userState = {
      userConfig: {
        typeuser: '', // TODO: Check this after feedback
        islogged: false,
        token: '',
      },
      error: null,
      loading: false,
    };
    try {
      const response = await axios.post(
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
      userState.loading = true;
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
      userState.loading = false;
    } finally {
      dispatch({
        type: SET_USER,
        payload: userState,
      });
    }
  };
};

export const getUserFetch = (token, phoneToken = null) => {
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
        phoneToken: {token: ''},
      },
      loading: false,
    };
    try {
      // Get user after login
      const response = await axios.get(
        'http://192.168.100.31:5000/api/users/user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      userState.userData = Object.assign({}, userState.userData, {
        ...response.data.data,
      });

      if (phoneToken !== null) {
        if (userState.userData.phoneToken.token !== phoneToken) {
          await axios.patch(
            'http://192.168.100.31:5000/api/users/updatetokenphone',
            {
              token: phoneToken,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
      }

      dispatch({
        type: SET_USER,
        payload: userState,
      });
    } catch (error) {
      switch (error.response.status) {
        case 401:
          dispatch(logout());
          break;
        default:
          break;
      }
    }
  };
};
