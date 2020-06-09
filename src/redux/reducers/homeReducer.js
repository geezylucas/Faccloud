import {COUNT_BY_XML_TYPE, GET_RECORDS} from '../constants';

const initialState = {
  totalByXMLType: [
    {
      _id: 'e',
      totalCfdis: 0,
    },
    {
      _id: 'r',
      totalCfdis: 0,
    },
  ],
  lastReceptorXML: {},
  lastEmisorXML: {},
  dataListRecords: {
    cfdis: [],
    dataPagination: {
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
        lastEmisorXML: action.payload.lastEmisorCFDI,
        lastReceptorXML: action.payload.lastReceptorCFDI,
      };
    case GET_RECORDS:
      return {
        ...state,
        dataListRecords: action.payload,
      };
    default:
      return state;
  }
}
