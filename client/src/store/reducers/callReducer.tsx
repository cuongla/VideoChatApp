import {
  CALL_SET_LOCAL_STREAM,
  CALL_SET_CALL_STATE,
  CALL_SET_CALLING_DIALOG_VISIBLE,
  CALL_SET_CALLER_USERNAME
} from 'constants/index';
import { callActions, callState } from 'typings/callTypes';

export const callStates = {
  CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
  CALL_AVAILABLE: 'CALL_AVAILABLE',
  CALL_REQUESTED: 'CALL_REQUESTED',
  CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
}

const initalState: callState = {
  localStream: null,
  callState: callStates.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUsername: ''
};

const CallReducer = (state = initalState, action: callActions) => {
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
    case CALL_SET_CALLING_DIALOG_VISIBLE:
      return {
        ...state,
        callingDialogVisible: action.callingDialogVisible
      };
    case CALL_SET_CALLER_USERNAME:
      return {
        ...state,
        callerUsername: action.callerUsername
      };
    default:
      return state;
  }
}
  ;

export default CallReducer;
