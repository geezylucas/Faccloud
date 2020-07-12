import axios from 'axios';
import Moment from 'moment';
import {GET_REQUESTS} from '../constants';
import {logout} from '../reducers/rootReducer';

export const getRequestsFetch = ({pageSize = 10, pageNum, filters, token}) => {
  return async (dispatch) => {
    let response = null;
    try {
      if (filters === null) {
        response = await axios.get(
          `http://192.168.100.31:5000/api/requestscfdis/getrequests/?pagesize=${pageSize}&pagenum=${pageNum}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        response = await axios.post(
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
      }
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
