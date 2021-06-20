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
    CALL_RESET_CALL_STATE,
    CALL_SET_GROUP_CALL_ACTIVE,
    CALL_SET_GROUP_CALL_STREAMS,
    CALL_CLEAR_GROUP_CALL_DATA,
    CALL_SET_CHAT_MESSAGE
} from 'constants/index'
import { IUser } from './userTypes'


export interface CallRequestData {
    callee: IUser,
    caller: {
        username: string
    }
}

export interface ICallRejectedDetails {
    rejected: boolean
    reason: string
}

export interface callReducerState {
    localStream: any
    callState: string
    callingDialogVisible: boolean
    callerUsername: string
    callRejected: ICallRejectedDetails
    remoteStream: any
    localCameraEnabled: boolean
    localMicrophoneEnabled: boolean
    screenSharingActive: boolean
    groupCallActive: boolean
    groupCallStreams: any
    message: {
        received: boolean
        content: string
    }
}

type setLocaStreamAction = {
    type: typeof CALL_SET_LOCAL_STREAM
    localStream: any
}

type setRemoteStreamAction = {
    type: typeof CALL_SET_REMOTE_STREAM
    remoteStream: any
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

type setCallRejectAction = {
    type: typeof CALL_SET_CALL_REJECTED
    callRejected: ICallRejectedDetails
}

type setLocalCameraAction = {
    type: typeof CALL_SET_LOCAL_CAMERA_ENABLED
    localCameraEnabled: boolean
}

type setLocalMicrophoneAction = {
    type: typeof CALL_SET_LOCAL_MICROPHONE_ENABLED
    localMicrophoneEnabled: boolean
}

type setScreenSharingAction = {
    type: typeof CALL_SET_SCREEN_SHARING_ACTIVE
    screenSharingActive: boolean
}

type setResetCallState = {
    type: typeof CALL_RESET_CALL_STATE
    callerUsername: callReducerState
}

type setGroupCallActive = {
    type: typeof CALL_SET_GROUP_CALL_ACTIVE
    groupCallActive: boolean
}

type setGroupCallStreams = {
    type: typeof CALL_SET_GROUP_CALL_STREAMS
    groupCallStreams: any
}

type setClearGroupCall = {
    type: typeof CALL_CLEAR_GROUP_CALL_DATA
}

type setCallChat = {
    type: typeof CALL_SET_CHAT_MESSAGE
    message: {
        received: boolean
        content: string
    }
}

export type callActions = setLocaStreamAction | setRemoteStreamAction | setCallStateAction | setCallingDialogAction | setCallerUsernameAction | setCallRejectAction | setLocalCameraAction | setLocalMicrophoneAction | setScreenSharingAction | setResetCallState | setGroupCallActive | setClearGroupCall | setGroupCallStreams | setCallChat;