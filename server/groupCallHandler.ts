import { UserData } from './interfaces';

export const createPeerServerListeners = (peerServer: any) => {
    peerServer.on('connection', (client: UserData) => {
        console.log('Connecting to peerjs server');
        console.log(client.id)
    });
};

