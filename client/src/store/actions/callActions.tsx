import { Dispatch } from 'react'
import { callActions } from 'typings/callTypes'
import {
    CALL_SET_LOCAL_STREAM,
    CALL_SET_CALL_STATE,
    CALL_SET_CALLING_DIALOG_VISIBLE,
    CALL_SET_CALLER_USERNAME
} from 'constants/index';

export const setLocalStream = (localStream: any) => {
    return (dispatch: Dispatch<callActions>) => {
        dispatch({
            type: CALL_SET_LOCAL_STREAM,
            localStream
        })
    }
}

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