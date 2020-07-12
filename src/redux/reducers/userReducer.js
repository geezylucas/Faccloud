import {SET_USER} from '../constants';

const initialState = {
  userData: {
    creationdate: {
      $date: 0,
    },
    email: '',
    lastname: '',
    name: '',
    phonenumber: '',
    satInfo: {
      rfc: '',
      settingsrfc: {
        timerautomatic: false,
        timerequest: 0,
        usocfdis: {},
      },
    },
  },
  userConfig: {
    typeuser: '', // TODO: Check this after feedback
    islogged: false,
    token: '',
  },
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {...action.payload};
    default:
      return state;
  }
}
