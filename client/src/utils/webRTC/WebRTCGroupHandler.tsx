import * as wss from '../wssConnection';
import { store } from 'store';
import {
    setGroupCallIncomingStreams,
    setGroupCallActive,
    clearGroupCallData,
    setCallState
} from 'store/actions/callActions';
import { callActions } from 'typings/callTypes';
import { callStates } from 'store/reducers/callReducer';


// state
let myPeer: any;
let myPeerId: string | number;
let groupCallRoomId: string | null;
let groupCallHost: boolean | null = false;

// setup devices before call 
const addVideoStream = (incomingStream: any) => {
    const groupCallStreams = [
        ...store.getState().call.groupCallStreams,
        incomingStream
    ];

    store.dispatch(setGroupCallIncomingStreams(groupCallStreams) as callActions);
};

export const connectWithMyPeer = () => {
    // @ts-ignore
    myPeer = new window.Peer(undefined, {
        path: '/peerjs',
        host: '/',
        port: '5000'
    });

    myPeer.on('open', (id: string | number) => {
        console.log('Connecting to peer server');
        myPeerId = id;
    })

    myPeer.on('call', (call: any) => {
        call.answer(store.getState().call.localStream);
        call.on('stream', (incomingStream: any) => {
            const streams = store.getState().call.groupCallStreams;
            const stream = streams.find((stream: any) => stream.id === incomingStream.id);

            if (!stream) {
                addVideoStream(incomingStream);
            }
        });
    });
}

export const createNewGroupCall = () => {
    groupCallHost = true;
    wss.registerGroupCall({
        username: store.getState().dashboard.username,
        peerId: myPeerId
    });

    store.dispatch(setGroupCallActive(true) as callActions);
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS) as any);
};

export const joinGroupCall = (hostSocketId: string, roomId: string) => {
    const localStream = store.getState().call.localStream;
    groupCallRoomId = roomId;

    wss.userWantsToJoinGroupCall({
        peerId: myPeerId,
        hostSocketId,
        roomId,
        localStreamId: localStream.id
    });

    store.dispatch(setGroupCallActive(true) as callActions);
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS) as any);
};

export const connectToNewUser = (data: any) => {
    const localStream = store.getState().call.localStream;

    const call = myPeer.call(data.peerId, localStream);

    call.on('stream', (incomingStream: any) => {
        const streams = store.getState().call.groupCallStreams;
        const stream = streams.find((stream: any) => stream.id === incomingStream.id);

        if (!stream) {
            addVideoStream(incomingStream);
        }
    });
};

export const leaveGroupCall = () => {
    if (groupCallHost) {
        wss.groupCallClosedByHost({
            peerId: myPeerId
        });
    } else {
        wss.userLeftGroupCall({
            streamId: store.getState().call.localStream.id,
            roomId: groupCallRoomId
        });
    }
    clearGroupData();
};

export const clearGroupData = () => {
    groupCallRoomId = null;
    groupCallHost = null;
    store.dispatch(clearGroupCallData() as any);
    myPeer.destroy();
    connectWithMyPeer();

    const localStream = store.getState().call.localStream;
    localStream.getVideoTracks()[0].enabled = true;
    localStream.getAudioTracks()[0].enabled = true;
};

export const removeInactiveStream = (data: any) => {
    const groupCallStreams = store.getState().call.groupCallStreams.filter(
        (stream: any) => stream.id !== data.streamId
    );
    store.dispatch(setGroupCallIncomingStreams(groupCallStreams) as callActions);
};

// if group call is active return roomId if not return false
export const checkActiveGroupCall = () => {
    if (store.getState().call.groupCallActive) {
        return groupCallRoomId;
    } else {
        return false;
    }
}