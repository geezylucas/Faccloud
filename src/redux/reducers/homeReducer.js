import {COUNT_BY_XML_TYPE, GET_XMLS} from '../constants';

const initialState = {
  lastreceptorxml: null,
  lastemisorxml: null,
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
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COUNT_BY_XML_TYPE:
      return {
        ...state,
        lastemisorxml: action.payload.lastEmisorCFDI,
        lastreceptorxml: action.payload.lastReceptorCFDI,
      };
    case GET_XMLS:
      return {
        ...state,
        datalistxmls: action.payload,
      };
    default:
      return state;
  }
}
