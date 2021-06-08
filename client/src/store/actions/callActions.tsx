import { Dispatch } from 'react'
import { callActions } from 'typings/callTypes'
import {
    CALL_SET_LOCAL_STREAM,
    CALL_SET_CALL_STATE
} from './types'

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