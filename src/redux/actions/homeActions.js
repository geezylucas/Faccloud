import axios from 'axios';
import Moment from 'moment';
import {COUNT_BY_XML_TYPE, GET_XMLS} from '../constants';
import {logout} from '../reducers/rootReducer';

export const getCountByXMLTypeFetch = (rfc, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://192.168.100.31:5000/api/cfdis/lastcfditotype/${rfc}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({
        type: COUNT_BY_XML_TYPE,
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

export const getXMLSFetch = ({
  pageSize = 10,
  pageNum,
  typeComprobante,
  typeRequest,
  filters = null,
  token,
}) => {
  return async (dispatch, getState) => {
    const {rfc, settingsrfc} = getState().userdata.userData.satInfo;

    let response = null;
    try {
      if (filters === null) {
        response = await axios.get(
          `http://192.168.100.31:5000/api/cfdis/getcfdis/${rfc}?pagesize=${pageSize}&pagenum=${pageNum}&typecomprobante=${typeComprobante}&typerequest=${typeRequest}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        response = await axios.post(
          `http://192.168.100.31:5000/api/cfdis/getcfdis/${rfc}?pagesize=${pageSize}&pagenum=${pageNum}&typecomprobante=${typeComprobante}&typerequest=${typeRequest}`,
          {
            rfc: filters.rfc,
            dateIni: Moment(filters.dateIni).format('YYYY-MM-DD'),
            dateFin: Moment(filters.dateFin).format('YYYY-MM-DD'),
            usoCfdi:
              filters.usoCfdi === '' || filters.usoCfdi === 'Todos'
                ? ''
                : Object.keys(settingsrfc.usocfdis).find(
                    (key) => settingsrfc.usocfdis[key] === filters.usoCfdi,
                  ),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      dispatch({
        type: GET_XMLS,
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
