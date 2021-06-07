import { Socket } from 'socket.io';
import { UserData } from './interfaces';

interface IPeer {
    username: string
    socket: number | string
}

const SocketServer = (socket: Socket) => {
    socket.emit('connection', null);
    console.log('Connecting to socket.io')
    console.log(socket.id)
    // peers
    let peers: IPeer[] = [];

    socket.on('addNewUser', (data: UserData) => {
        peers.push({
            username: data.username,
            socket: data.socketId
        });
        console.log('New user is added');
        console.log(peers);
    })
}

export default SocketServer;