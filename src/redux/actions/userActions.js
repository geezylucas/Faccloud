import {SAVE_USER} from '../constants';

export const saveUserFetch = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SAVE_USER,
      payload: data,
    });
  };
};
