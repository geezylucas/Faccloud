import {SET_USER, GET_SAT_INFORMATION} from '../constants';

// TODO: Cuando tengamos el login, quitart password de initialState
const initialState = {
  satinformation: {
    _id: {$oid: ''},
    rfc: '',
    settingsrfc: {
      timerautomatic: false,
      timerequest: 0,
      usocfdis: {},
    },
  },
  user: {
    typeuser: '',
    islogged: false,
    token: '',
    name: '',
    userId: {$oid: ''},
    error: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {...action.payload};
    case GET_SAT_INFORMATION:
      return {...state, satinformation: action.payload};
    default:
      return state;
  }
}
