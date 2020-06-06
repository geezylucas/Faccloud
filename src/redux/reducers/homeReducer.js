import {COUNT_BY_XML_TYPE, GET_RECORDS} from '../constants';

const initialState = {
  totalByXMLType: [],
  lastReceptorXML: {},
  lastEmisorXML: {},
  dataRecords: {
    cfdis: [],
    totalRecords: {
      fieldsmatched: 0,
      pages: 1,
      totalMonto: {
        $numberDecimal: 0,
      },
    },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COUNT_BY_XML_TYPE:
      return {
        ...state,
        totalByXMLType: action.payload.typesCFDI,
        lastEmisorXML: action.payload.lastEmisorCFDI[0],
        lastReceptorXML: action.payload.lastReceptorCFDI[0],
      };
    case GET_RECORDS:
      return {
        ...state,
        dataRecords: action.payload,
      };
    default:
      return state;
  }
}
