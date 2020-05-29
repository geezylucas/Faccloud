import {SAVE_USER} from '../constants';

export const save_user = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SAVE_USER,
      payload: data,
    });
  };
};
