import * as actions from '../actions';
import * as types from '../types';

const setPeriod = data => {
  return dispatch => {
    dispatch(actions.withPayload(types.SET_PERIOD, data));
  };
};
export default setPeriod;
