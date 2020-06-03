import {combineReducers} from 'redux';
import userReducer from './userReducer';
import homeReducer from './homeReducer';

const combinedReducers = combineReducers({
  userdata: userReducer,
  homedata: homeReducer,
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
