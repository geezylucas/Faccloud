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
    username: '',
    typeuser: '',
    islogged: false,
    token: '',
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload};
    case GET_SAT_INFORMATION:
      return {...state, satinformation: action.payload};
    default:
      return state;
  }
}
