import {combineReducers} from 'redux';
import userReducer from './userReducer';

const combinedReducers = combineReducers({
  userdata: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return combinedReducers(undefined, action);
  }

  return combinedReducers(state, action);
};

export default rootReducer;

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};
