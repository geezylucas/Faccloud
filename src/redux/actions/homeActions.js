import axios from 'axios';
import Moment from 'moment';
import {COUNT_BY_XML_TYPE, GET_XMLS, RESET_HOME} from '../constants';
import {logout} from '../reducers/rootReducer';

export const getCountByXMLTypeFetch = (rfc, token) => {
  return async (dispatch) => {
    dispatch({
      type: RESET_HOME,
      payload: {loadingButton: true},
    });

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
  pageNum = 1,
  typeComprobante,
  typeRequest,
  filters = null,
  token,
}) => {
  return async (dispatch, getState) => {
    dispatch({
      type: RESET_HOME,
      payload: {loadingButton: true},
    });

    const {rfc, settingsrfc} = getState().userdata.userData.satInfo;

    let typeXMLToSend;
    if (typeComprobante === 'Facturas') {
      typeXMLToSend = 'I-E';
    } else {
      typeXMLToSend = typeComprobante.substring(0, 1);
    }

    let response = null;
    try {
      if (filters === null) {
        response = await axios.get(
          `http://192.168.100.31:5000/api/cfdis/getcfdis/${rfc}?pagesize=${pageSize}&pagenum=${pageNum}&typecomprobante=${typeXMLToSend}&typerequest=${typeRequest}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        response = await axios.post(
          `http://192.168.100.31:5000/api/cfdis/getcfdis/${rfc}?pagesize=${pageSize}&pagenum=${pageNum}&typecomprobante=${typeXMLToSend}&typerequest=${typeRequest}`,
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

export const loadingHomeReset = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_HOME,
      payload: {
        loading: true,
        loadingButton: true,
        datalistxmls: {
          cfdis: [],
          dataPagination: {
            fieldsmatched: 0,
            pages: 1,
            totalMonto: {
              $numberDecimal: 0,
            },
          },
        },
      },
    });
  };
};

export const loadingRefreshScreen = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET_HOME,
      payload: {
        loading: true,
      },
    });
  };
};
