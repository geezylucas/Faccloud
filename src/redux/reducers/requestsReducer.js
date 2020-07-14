import {GET_REQUESTS, RESET_REQUESTS} from '../constants';

const initialState = {
  requests: [],
  dataPagination: {fieldsmatched: 0, pages: 1},
  loading: true,
  loadingButton: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_REQUESTS:
      return {...state, ...action.payload};
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload.requests,
        dataPagination: action.payload.dataPagination,
        loading: false,
        loadingButton: false,
      };
    default:
      return state;
  }
}
