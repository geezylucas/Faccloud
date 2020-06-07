import {GET_REQUESTS, GET_REQUEST} from '../constants';

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
    default:
      return state;
  }
}
