import express, { Request, Response } from 'express';
import socket, { Socket } from 'socket.io';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from 'cookie-parser';
import path from 'path';
import { SocketServer } from './socketServer';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// connecting socket
const http = createServer(app);
const io = new Server(http);
io.on('connection', (socket: Socket) => {
    console.log('Connecting to socket.io')
    console.log(socket.id)
    SocketServer(socket);
});

//production for deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// connecting to server
const PORT = 5000;
app.listen(PORT, () => console.log(`Listning to port ${PORT}`));
