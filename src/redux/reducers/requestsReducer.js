import {GET_REQUESTS} from '../constants';

const initialState = {
  requests: [],
  dataPagination: {fieldsmatched: 0, pages: 1},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload.requests,
        dataPagination: action.payload.dataPagination,
      };
    default:
      return state;
  }
}
