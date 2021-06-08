import { CALL_SET_LOCAL_STREAM, CALL_SET_CALL_STATE } from '../actions/types';
import { callActions, callState } from 'typings/callTypes';

export const callStates = {
  CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
  CALL_AVAILABLE: 'CALL_AVAILABLE',
  CALL_REQUESTED: 'CALL_REQUESTED',
  CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
}

const initState: callState = {
  localStream: null,
  callState: callStates.CALL_UNAVAILABLE
};

const CallReducer = (state = initState, action: callActions) => {
  switch (action.type) {
    case CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream
      };
    case CALL_SET_CALL_STATE:
      return {
        ...state,
        callState: action.callState
      }
    default:
      return state;
  }
}
  ;

export default CallReducer;
