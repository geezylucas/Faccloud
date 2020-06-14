import axios from 'axios';
import Moment from 'moment';
import {GET_REQUESTS} from '../constants';

export const getRequestsFetch = ({pageSize = 10, pageNum, filters}) => {
  return async (dispatch, getState) => {
    const {$oid} = getState().userdata.satinformation._id;

    let response = null;
    try {
      if (filters === null) {
        response = await axios.get(
          `http://192.168.100.31:5000/api/requestscfdis/getrequests/${$oid}?pagesize=${pageSize}&pagenum=${pageNum}`,
        );
      } else {
        response = await axios.post(
          `http://192.168.100.31:5000/api/requestscfdis/getrequests/${$oid}?pagesize=${pageSize}&pagenum=${pageNum}`,
          {
            dateIni: Moment(filters.dateIni).format('YYYY-MM-DD'),
            dateFin: Moment(filters.dateFin).format('YYYY-MM-DD'),
            status:
              filters.status === '' || filters.status === 'Ninguno'
                ? ''
                : filters.status === 'Descargado'
                ? true
                : false,
          },
        );
      }
      dispatch({
        type: GET_REQUESTS,
        payload: response.data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
