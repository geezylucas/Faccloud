import axios from 'axios';
import Moment from 'moment';
import {GET_REQUESTS, RESET_REQUESTS} from '../constants';
import {logout} from '../reducers/rootReducer';

export const getRequestsFetch = ({pageSize = 10, pageNum, filters, token}) => {
  return async (dispatch) => {
    dispatch({
      type: RESET_REQUESTS,
      payload: {loadingButton: true},
    });

    try {
      const response = await axios.post(
        `http://192.168.100.31:5000/api/requestscfdis/getrequests/?pagesize=${pageSize}&pagenum=${pageNum}`,
        {
          dateIni: Moment(filters.dateIni).format('YYYY-MM-DD'),
          dateFin: Moment(filters.dateFin).format('YYYY-MM-DD'),
          status:
            filters.status === '' || filters.status === 'Todos'
              ? ''
              : filters.status === 'Descargado'
              ? true
              : false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({
        type: GET_REQUESTS,
        payload: response.data.data,
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

export const loadingRefreshScreen = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_REQUESTS,
      payload: {
        loading: true,
      },
    });
  };
};
