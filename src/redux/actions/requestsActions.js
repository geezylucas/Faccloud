import axios from 'axios';
import Moment from 'moment';
import {GET_REQUESTS} from '../constants';

export const getRequestsFetch = ({pageSize = 10, pageNum, filters}) => {
  return async (dispatch, getState) => {
    const {idInfo} = getState().userdata.user;

    let response = null;
    try {
      if (filters === null) {
        response = await axios.get(
          `http://192.168.100.31:5000/api/requestscfdis/getrequests/${idInfo}?pagesize=${pageSize}&pagenum=${pageNum}`,
        );
      } else {
        response = await axios.post(
          `http://192.168.100.31:5000/api/requestscfdis/getrequests/${idInfo}?pagesize=${pageSize}&pagenum=${pageNum}`,
          {
            dateIni: Moment(filters.dateIni).format('YYYY-MM-DD'),
            dateFin: Moment(filters.dateFin).format('YYYY-MM-DD'),
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
