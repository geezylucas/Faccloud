import axios from 'axios';
import Moment from 'moment';
import {COUNT_BY_XML_TYPE, GET_RECORDS} from '../constants';

export const countByXMLType = (data) => {
  const {id, typeUser} = data;

  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://192.168.100.31:5000/api/cfdis/totalcfdistotype/${id}?typeuser=${typeUser}`,
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

export const getRecords = (data) => {
  const {id, pageSize, pageNum, typeComprobante, typeRequest, filters} = data;

  return async (dispatch) => {
    try {
      let response = null;

      if (filters === null) {
        response = await axios.get(
          `http://192.168.100.31:5000/api/cfdis/getrecords/${id}?pagesize=${pageSize}&pagenum=${pageNum}&typecomprobante=${typeComprobante}&typerequest=${typeRequest}`,
        );
      } else {
        response = await axios.post(
          `http://192.168.100.31:5000/api/cfdis/getrecords/${id}?pagesize=${pageSize}&pagenum=${pageNum}&typecomprobante=${typeComprobante}&typerequest=${typeRequest}`,
          {
            rfc: filters.rfc,
            dateIni: Moment(filters.dateIni).format('YYYY-MM-DD'),
            dateFin: Moment(filters.dateFin).format('YYYY-MM-DD'),
            usocfdi:
              filters.usocfdi === '' || filters.usocfdi === 'Ninguno'
                ? ''
                : filters.usocfdi,
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
