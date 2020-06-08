import axios from 'axios';
import Moment from 'moment';
import {COUNT_BY_XML_TYPE, GET_RECORDS, GET_RECORD} from '../constants';

export const countByXMLType = ({idInfo, typeUser}) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://192.168.100.31:5000/api/cfdis/totalcfdistotype/${idInfo}?typeuser=${typeUser}`,
      );
      dispatch({
        type: COUNT_BY_XML_TYPE,
        payload: response.data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getRecordsFetch = ({
  idInfo,
  pageSize,
  pageNum,
  typeComprobante,
  typeRequest,
  filters,
}) => {
  return async (dispatch) => {
    try {
      let response = null;

      if (filters === null) {
        response = await axios.get(
          `http://192.168.100.31:5000/api/cfdis/getcfdis/${idInfo}?pagesize=${pageSize}&pagenum=${pageNum}&typecomprobante=${typeComprobante}&typerequest=${typeRequest}`,
        );
      } else {
        response = await axios.post(
          `http://192.168.100.31:5000/api/cfdis/getcfdis/${idInfo}?pagesize=${pageSize}&pagenum=${pageNum}&typecomprobante=${typeComprobante}&typerequest=${typeRequest}`,
          {
            rfc: filters.rfc,
            dateIni: Moment(filters.dateIni).format('YYYY-MM-DD'),
            dateFin: Moment(filters.dateFin).format('YYYY-MM-DD'),
            usoCfdi:
              filters.usoCfdi === '' || filters.usoCfdi === 'Ninguno'
                ? ''
                : filters.usoCfdi,
          },
        );
      }
      dispatch({
        type: GET_RECORDS,
        payload: response.data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getRecordFetch = (idItem) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://192.168.100.31:5000/api/cfdis/${idItem}`,
      );
      dispatch({
        type: GET_RECORD,
        payload: response.data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
