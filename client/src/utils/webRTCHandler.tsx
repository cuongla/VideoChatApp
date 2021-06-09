/* eslint-disable @typescript-eslint/no-unused-vars */
import { store } from "store";
import { setCallingDialogVisible, setCallState, setLocalStream, setCallerUsername } from "store/actions/callActions";
import { callStates } from "store/reducers/callReducer";
import { IUser } from "typings/userTypes";
import * as wss from './wssConnection';

const requestCallState = {
    CALL_ACCEPTED: 'CALL_ACCEPTED',
    CALL_REJECTED: 'CALL_REJECTED',
    CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
}

export const getLocalStream = () => {
    navigator
        .mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(stream => {
            console.log(stream);
            store.dispatch(setLocalStream(stream) as any);
            store.dispatch(setCallState(callStates.CALL_AVAILABLE) as any)
        })
        .catch(err => console.log(err));
}

export const callOTherUser = (calleeDetails: IUser) => {
    connectedUserSocketId = calleeDetails.socketId;
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS) as any);
    store.dispatch(setCallingDialogVisible(true) as any);
    wss.sendCallRequest({
        callee: calleeDetails,
        caller: {
            username: store.getState().dashboard.username
        }
    })
}

// handling incoming calls
let connectedUserSocketId: number | string | null;

export const checkIfCallIsPossible = () => {
    if (store.getState().call.localStream === null ||
        store.getState().call.callState !== callStates.CALL_AVAILABLE) {
        return false;
    } else {
        return true;
    }
}

export const handleRequestCall = (data: any) => {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername) as any);
    store.dispatch(setCallState(callStates.CALL_REQUESTED) as any);
};

export const handlePreCallAnswer = (data: any) => {
    if (data.answer === requestCallState.CALL_ACCEPTED) {
        // send webRTC offer
    }
    else {
        let rejectionReason: string;

        if (data.answer === requestCallState.CALL_NOT_AVAILABLE) {
            rejectionReason = 'Callee is not able to pick up the call right now';
        } else {
            rejectionReason = 'Call rejected by the callee';
        }
    }
};

export const acceptIncomingCall = (data: any) => {
    wss.sendCallAnswer({
        callerSocketId: connectedUserSocketId,
        answer: requestCallState.CALL_ACCEPTED
    })
}

export const rejectIncomingCallRequest = () => {
    wss.sendCallAnswer({
        callerSocketId: connectedUserSocketId,
        answer: requestCallState.CALL_REJECTED
    });

    resetCallData();
};

export const resetCallData = () => {
    connectedUserSocketId = null;
    store.dispatch(setCallState(callStates.CALL_AVAILABLE) as any);
};