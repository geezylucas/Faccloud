import axios from 'axios';
import Moment from 'moment';
import {
  GET_REQUESTS,
  GET_REQUEST,
  SEND_REQUEST,
  REMOVE_ID_REQUEST,
} from '../constants';

export const getRequestsFetch = ({idInfo, pageSize, pageNum, filters}) => {
  return async (dispatch) => {
    try {
      let response = null;

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

export const getRequestFetch = (idItem) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://192.168.100.31:5000/api/requestscfdis/${idItem}`,
      );
      dispatch({
        type: GET_REQUEST,
        payload: response.data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const sendRequestFetch = ({idInfo, filters}) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://192.168.100.31:5000/api/requestscfdis',
        {
          infoId: idInfo,
          dateIni: Moment(filters.dateIni).format('YYYY-MM-DD'),
          dateFin: Moment(filters.dateFin).format('YYYY-MM-DD'),
          typeRequest:
            filters.usoCfdi !== ''
              ? 'e'
              : filters.typeRequest.substring(0, 1).toLowerCase(),
        },
      );
      dispatch({
        type: SEND_REQUEST,
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeIdRequestToState = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: REMOVE_ID_REQUEST,
        payload: {_id: null, message: null},
      });
    } catch (error) {
      console.log(error);
    }
  };
};
