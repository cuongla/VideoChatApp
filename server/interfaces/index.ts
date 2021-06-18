export interface UserData {
    id?: string | number
    username: string
    socketId: string
}

export interface GroupCallData {
    peerId: string
    username: string
    socketId: number | string
    roomId: string
    streamId: string
}

export interface IGroupRoom {
    peerId: string
    hostName: string
    socketId: number | string
    roomId: string
}

export interface RequestCallData {
    callee: UserData
    caller: UserData
    callerSocketId: number | string
    answer: boolean
}