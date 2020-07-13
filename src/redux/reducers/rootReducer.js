import {combineReducers} from 'redux';
import userReducer from './userReducer';
import homeReducer from './homeReducer';
import requestsReducer from './requestsReducer';

const combinedReducers = combineReducers({
  userdata: userReducer,
  homedata: homeReducer,
  requestsdata: requestsReducer,
});

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return combinedReducers(undefined, action);
    default:
      return combinedReducers(state, action);
  }
};

export default rootReducer;
