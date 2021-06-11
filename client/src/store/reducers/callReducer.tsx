import {
  CALL_SET_LOCAL_STREAM,
  CALL_SET_CALL_STATE,
  CALL_SET_CALLING_DIALOG_VISIBLE,
  CALL_SET_CALLER_USERNAME,
  CALL_SET_CALL_REJECTED,
  CALL_SET_REMOTE_STREAM,
  CALL_SET_LOCAL_CAMERA_ENABLED,
  CALL_SET_LOCAL_MICROPHONE_ENABLED,
  CALL_SET_SCREEN_SHARING_ACTIVE,
  CALL_RESET_CALL_STATE
} from 'constants/index';
import { callActions, callReducerState } from 'typings/callTypes';

export const callStates = {
  CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
  CALL_AVAILABLE: 'CALL_AVAILABLE',
  CALL_REQUESTED: 'CALL_REQUESTED',
  CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
}

const initalState: callReducerState = {
  localStream: null,
  callState: callStates.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUsername: '',
  callRejected: {
    rejected: false,
    reason: ''
  },
  remoteStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false
};

const CallReducer = (state = initalState, action: callActions): callReducerState => {
  switch (action.type) {
    case CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream
      };
    case CALL_SET_REMOTE_STREAM:
      return {
        ...state,
        remoteStream: action.remoteStream
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
    case CALL_SET_CALL_REJECTED:
      return {
        ...state,
        callRejected: action.callRejected
      };
    case CALL_SET_LOCAL_CAMERA_ENABLED:
      return {
        ...state,
        localCameraEnabled: action.localCameraEnabled
      };
    case CALL_SET_LOCAL_MICROPHONE_ENABLED:
      return {
        ...state,
        localMicrophoneEnabled: action.localMicrophoneEnabled
      };
    case CALL_SET_SCREEN_SHARING_ACTIVE:
      return {
        ...state,
        screenSharingActive: action.screenSharingActive
      };
    case CALL_RESET_CALL_STATE:
      return {
        ...state,
        remoteStream: null,
        screenSharingActive: false,
        callerUsername: '',
        localMicrophoneEnabled: true,
        localCameraEnabled: true,
        callingDialogVisible: false
      };
    default:
      return state;
  }
}
  ;

export default CallReducer;
