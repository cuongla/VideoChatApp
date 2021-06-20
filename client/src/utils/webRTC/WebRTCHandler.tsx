import { store } from 'store';
import { setRemoteStream, setScreenSharingActive } from 'store/actions/callActions';
import {
    setCallState,
    setLocalStream,
    setCallingDialogVisible,
    setCallerUsername,
    setCallRejected,
    resetCallDataState
} from "store/actions/callActions";
import { callStates } from "store/reducers/callReducer";
import { IUser } from "typings/userTypes";
import * as wss from '../wssConnection';

let connectedUserSocketId: number | string | null;

// responding to call state
const requestCallState = {
    CALL_ACCEPTED: 'CALL_ACCEPTED',
    CALL_REJECTED: 'CALL_REJECTED',
    CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
}

// creating a peer connecting
let peerConnection: any;

const configuration = {
    iceServers: [{
        urls: 'stun:stun.l.google.com:13902'
    }]
};

export const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection(configuration);

    const localStream = store.getState().call.localStream;

    for (const track of localStream.getTracks()) {
        peerConnection.addTrack(track, localStream);
    }

    peerConnection.ontrack = ({ streams: [stream] }: any) => {
        store.dispatch(setRemoteStream(stream) as any);
    };

    peerConnection.onicecandidate = (event: any) => {
        console.log('geeting candidates from stun server');
        if (event.candidate) {
            wss.handleWebRTCCandidate({
                candidate: event.candidate,
                connectedUserSocketId
            });
        }
    };
}

/* ========== SETUP CALLER BEFORE CONVERSATION ========== */
export const getLocalStream = () => {
    navigator
        .mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(stream => {
            console.log(stream);
            store.dispatch(setLocalStream(stream) as any);
            store.dispatch(setCallState(callStates.CALL_AVAILABLE) as any)
        })
        .catch(err => {
            console.log('Error occured while trying to get an access to local stream.')
            console.log(err)
        });
}

/* ========== CALLER REQUEST CALLS ========== */
export const checkIfCallIsPossible = () => {
    if (store.getState().call.localStream === null ||
        store.getState().call.callState !== callStates.CALL_AVAILABLE) {
        return false;
    } else {
        return true;
    }
}

export const handleCallOtherUser = (calleeDetails: IUser) => {
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

export const handleRequestCall = (data: any) => {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername) as any);
    store.dispatch(setCallState(callStates.CALL_REQUESTED) as any);
};

export const handlePreRequest = (data: any) => {
    if (checkIfCallIsPossible()) {
        connectedUserSocketId = data.callerSocketId;
        store.dispatch(setCallerUsername(data.callerUsername) as any);
        store.dispatch(setCallState(callStates.CALL_REQUESTED) as any);
    } else {
        wss.sendCallResponse({
            callerSocketId: data.callerSocketId,
            answer: requestCallState.CALL_NOT_AVAILABLE
        });
    }
};

/* ========== CALLEE RESPONSE CALLS ========== */
export const handlePreResponse = (data: any) => {
    store.dispatch(setCallingDialogVisible(false) as any);
    if (data.answer === requestCallState.CALL_ACCEPTED) {
        handleSendingResponse();
    } else {
        let rejectionReason;
        if (data.answer === requestCallState.CALL_NOT_AVAILABLE) {
            rejectionReason = 'Callee is not able to pick up the call right now';
        } else {
            rejectionReason = 'Call rejected by the callee';
        }
        store.dispatch(setCallRejected({
            rejected: true,
            reason: rejectionReason
        }) as any);

        resetCallData();
    }
}

const handleSendingResponse = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    wss.sendWebRTCOffer({
        calleeSocketId: connectedUserSocketId,
        offer: offer
    });
};

export const handleAcceptIncomingCallRequest = () => {
    wss.sendCallResponse({
        callerSocketId: connectedUserSocketId,
        answer: requestCallState.CALL_ACCEPTED
    });

    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS) as any);
};

export const handleRejectIncomingCallRequest = () => {
    wss.sendCallResponse({
        callerSocketId: connectedUserSocketId,
        answer: requestCallState.CALL_REJECTED
    });
    resetCallData();
};

/* ========== CONNECTING CALLER AND CALLLEE ========== */
export const handleConnectingCaller = async (data: any) => {
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    wss.connectingCaller({
        callerSocketId: connectedUserSocketId,
        answer
    });
};

export const handleConnectingCallee = async (data: any) => {
    await peerConnection.setRemoteDescription(data.answer);
};

export const handleCandidate = async (data: any) => {
    try {
        console.log('Adding ice candidates');
        await peerConnection.addIceCandidate(data.candidate);
    } catch (err) {
        console.error('Error occured when trying to add received ice candidate', err);
    }
};

/* ========== SCREEN SHARING ========== */
let screenSharingStream: any;

export const switchForScreenSharingStream = async () => {
    if (!store.getState().call.screenSharingActive) {
        try {
            // @ts-ignore
            screenSharingStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            store.dispatch(setScreenSharingActive(true) as any);
            const senders = peerConnection.getSenders();
            const sender = senders.find((sender: any) => sender.track.kind === screenSharingStream.getVideoTracks()[0].kind);
            sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
        } catch (err) {
            console.error('error occured when trying to get screen sharing stream', err);
        }
    } else {
        const localStream = store.getState().call.localStream;
        const senders = peerConnection.getSenders();
        const sender = senders.find((sender: any) => sender.track.kind === localStream.getVideoTracks()[0].kind);
        sender.replaceTrack(localStream.getVideoTracks()[0]);
        store.dispatch(setScreenSharingActive(false) as any);
        screenSharingStream.getTracks().forEach((track: any) => track.stop());
    }
}


/* ========== RESET CALL OR USER HANG UP ========== */
const resetCallDataAfterHangUp = () => {
    peerConnection.close();
    peerConnection = null;
    createPeerConnection();
    resetCallData();

    const localStream = store.getState().call.localStream;
    localStream.getVideoTracks()[0].enabled = true;
    localStream.getAudioTracks()[0].enabled = true;

    if (store.getState().call.screenSharingActive) {
        screenSharingStream.getTracks().forEach((track: any) => {
            track.stop();
        });
    }

    store.dispatch(resetCallDataState() as any);
};

export const hangUp = () => {
    wss.handleUserHangUp({
        connectedUserSocketId: connectedUserSocketId
    });
    resetCallDataAfterHangUp();
};

export const handleUserHangedUp = () => {
    resetCallDataAfterHangUp();
};

export const resetCallData = () => {
    connectedUserSocketId = null;
    store.dispatch(setCallState(callStates.CALL_AVAILABLE) as any);
};