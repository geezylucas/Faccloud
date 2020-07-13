import {COUNT_BY_XML_TYPE, GET_XMLS, LOAD_HOME_LOADING} from '../constants';

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
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_HOME_LOADING:
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
      };
    default:
      return state;
  }
}
