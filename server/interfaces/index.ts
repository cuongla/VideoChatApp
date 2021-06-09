export interface UserData {
    username: string
    socketId: string 
}

export interface RequestCallData {
    callee: UserData
    caller: UserData
    callerSocketId: number | string
    answer: boolean
}