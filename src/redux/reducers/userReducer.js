import {SAVE_USER} from '../constants';

// TODO: Cuando tengamos el login, quitart password de initialState
const initialState = {
  isLogged: false,
  user: {
    id: '',
    username: '',
    password: '',
  },
  token: '',
  typeUser: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_USER:
      return {...action.payload};
    default:
      return state;
  }
}
