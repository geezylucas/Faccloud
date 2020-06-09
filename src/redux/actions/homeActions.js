import axios from 'axios';
import Moment from 'moment';
import {COUNT_BY_XML_TYPE, GET_RECORDS} from '../constants';

export const countByXMLType = () => {
  return async (dispatch, getState) => {
    const {idInfo, typeUser} = getState().userdata.user;

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
  pageSize = 10,
  pageNum,
  typeComprobante,
  typeRequest,
  filters = null,
}) => {
  return async (dispatch, getState) => {
    const {idInfo} = getState().userdata.user;

    let response = null;
    try {
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
