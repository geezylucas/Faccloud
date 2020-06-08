import {SAVE_USER} from '../constants';

// TODO: Cuando tengamos el login, quitart password de initialState
const initialState = {
  isLogged: false,
  user: {
    idInfo: '',
    username: '',
    password: '',
    typeUser: '',
  },
  token: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_USER:
      return {...action.payload};
    default:
      return state;
  }
}
