import {COUNT_BY_XML_TYPE, GET_XMLS, RESET_HOME} from '../constants';

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
  loading: true,
  loadingButton: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_HOME:
      return {...state, ...action.payload};
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
        loading: false,
        loadingButton: false,
      };
    default:
      return state;
  }
}
