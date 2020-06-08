import {
  GET_REQUESTS,
  GET_REQUEST,
  SEND_REQUEST,
  REMOVE_ID_REQUEST,
} from '../constants';

const initialState = {
  requests: [],
  dataPagination: {fieldsmatched: 0, pages: 1},
  request: {
    typerequest: '',
    status: false,
    numcfdis: 0,
    datestart: {$date: 0},
    daterequest: {$date: 0},
    dateend: {$date: 0},
    datedownload: {$date: 0},
  },
  dataSendRequest: {_id: null, message: null},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload.requests,
        dataPagination: action.payload.dataPagination,
      };
    case GET_REQUEST:
      return Object.assign({}, state, {
        request: Object.assign({}, state.request, action.payload),
      });
    case SEND_REQUEST:
      return {
        ...state,
        dataSendRequest: action.payload,
      };
    case REMOVE_ID_REQUEST:
      return {
        ...state,
        dataSendRequest: action.payload,
      };
    default:
      return state;
  }
}
