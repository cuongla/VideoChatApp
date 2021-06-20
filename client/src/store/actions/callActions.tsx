import { Dispatch } from 'react'
import { callActions, ICallRejectedDetails } from 'typings/callTypes'
import {
    CALL_SET_LOCAL_STREAM,
    CALL_SET_CALL_STATE,
    CALL_SET_CALLING_DIALOG_VISIBLE,
    CALL_SET_CALLER_USERNAME,
    CALL_SET_CALL_REJECTED,
    CALL_SET_REMOTE_STREAM,
    CALL_SET_LOCAL_MICROPHONE_ENABLED,
    CALL_SET_LOCAL_CAMERA_ENABLED,
    CALL_SET_SCREEN_SHARING_ACTIVE,
    CALL_RESET_CALL_STATE,
    CALL_SET_GROUP_CALL_ACTIVE,
    CALL_SET_GROUP_CALL_STREAMS,
    CALL_SET_CHAT_MESSAGE,
    CALL_CLEAR_GROUP_CALL_DATA
} from 'constants/index';

// stream on both caller and callee
export const setLocalStream = (localStream: any) => {
    return (dispatch: Dispatch<callActions>) => {
        dispatch({
            type: CALL_SET_LOCAL_STREAM,
            localStream
        })
    }
}

export const setRemoteStream = (remoteStream: any) => {
    return {
        type: CALL_SET_REMOTE_STREAM,
        remoteStream
    };
};

// check cqll states
export const setCallState = (callState: string) => {
    console.log(callState);
    return (dispatch: Dispatch<callActions>) => {
        dispatch({
            type: CALL_SET_CALL_STATE,
            callState
        })
    }
}

export const setCallingDialogVisible = (callingDialogVisible: boolean) => {
    return (dispatch: Dispatch<callActions>) => {
        dispatch({
            type: CALL_SET_CALLING_DIALOG_VISIBLE,
            callingDialogVisible
        })
    }
}

export const setCallerUsername = (callerUsername: string) => {
    return (dispatch: Dispatch<callActions>) => {
        dispatch({
            type: CALL_SET_CALLER_USERNAME,
            callerUsername
        })
    }
}

export const setCallRejected = (callRejectedDetails: ICallRejectedDetails) => {
    return {
        type: CALL_SET_CALL_REJECTED,
        callRejected: {
            rejected: callRejectedDetails.rejected,
            reason: callRejectedDetails.reason
        }
    };
};

// setting up devices for video chat 
export const setLocalMicrophoneEnabled = (enabled: boolean) => {
    return {
        type: CALL_SET_LOCAL_MICROPHONE_ENABLED,
        enabled
    };
};

export const setLocalCameraEnabled = (enabled: boolean) => {
    return {
        type: CALL_SET_LOCAL_CAMERA_ENABLED,
        enabled
    };
};

export const setScreenSharingActive = (active: boolean) => {
    return {
        type: CALL_SET_SCREEN_SHARING_ACTIVE,
        active
    };
};

// reset call 
export const resetCallDataState = () => {
    return {
        type: CALL_RESET_CALL_STATE
    };
};

// group calls handling
export const setGroupCallActive = (active: boolean) => {
    return {
        type: CALL_SET_GROUP_CALL_ACTIVE,
        active
    };
};

export const setGroupCallIncomingStreams = (groupCallStreams: any) => {
    return {
        type: CALL_SET_GROUP_CALL_STREAMS,
        groupCallStreams
    };
};

export const clearGroupCallData = () => {
    return {
        type: CALL_CLEAR_GROUP_CALL_DATA
    };
};

export const setMessage = (messageReceived: boolean, messageContent: string) => {
    return {
        type: CALL_SET_CHAT_MESSAGE,
        message: {
            received: messageReceived,
            content: messageContent
        }
    };
}
