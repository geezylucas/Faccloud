import {combineReducers} from 'redux';
import userReducer from './userReducer';
import homeReducer from './homeReducer';
import requestsReducer from './requestsReducer';

const combinedReducers = combineReducers({
  userdata: userReducer,
  homedata: homeReducer,
  requestsdata: requestsReducer,
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
