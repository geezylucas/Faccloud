import {SAVE_USER} from '../constants';

const initialState = {
  isLogged: false,
  user: {
    id: '',
    username: '',
    password: '',
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
