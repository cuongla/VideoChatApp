import {
    CALL_SET_LOCAL_STREAM,
    CALL_SET_CALL_STATE,
    CALL_SET_CALLING_DIALOG_VISIBLE,
    CALL_SET_CALLER_USERNAME,
} from 'constants/index'
import { IUser } from './userTypes'


export interface callState {
    localStream: any
    callState: string
    callingDialogVisible: boolean
    callerUsername: string
}

export interface CallRequestData {
    callee: IUser,
    caller: {
        username: string
    }
}

type setLocaStreamAction = {
    type: typeof CALL_SET_LOCAL_STREAM
    localStream: any
}

type setCallStateAction = {
    type: typeof CALL_SET_CALL_STATE
    callState: string
}

type setCallingDialogAction = {
    type: typeof CALL_SET_CALLING_DIALOG_VISIBLE
    callingDialogVisible: boolean
}

type setCallerUsernameAction = {
    type: typeof CALL_SET_CALLER_USERNAME
    callerUsername: string
}

export type callActions = setLocaStreamAction | setCallStateAction | setCallingDialogAction | setCallerUsernameAction;