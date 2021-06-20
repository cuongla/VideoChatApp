import * as wss from '../wssConnection';
import { store } from 'store';
import { } from 'store/actions/callActions';

// state
let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;

export const connectionWithMyPeer = () => {
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