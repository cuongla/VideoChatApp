import { CALL_SET_CALL_STATE, CALL_SET_LOCAL_STREAM } from 'store/actions/types';

export interface callState {
    localStream: any
    callState: string
}

type setLocaStreamAction = {
    type: typeof CALL_SET_LOCAL_STREAM
    localStream: any
}

type setCalStateAction = {
    type: typeof CALL_SET_CALL_STATE
    callState: string
}

export type callActions =  setLocaStreamAction | setCalStateAction;