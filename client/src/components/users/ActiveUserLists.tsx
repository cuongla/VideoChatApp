import React, { FC } from 'react'
import ActiveUserItem from './ActiveUserItem';
import { useSelector } from 'react-redux';
import { RootState } from 'store';


const ActiveUserLists: FC=() => {
    const { activeUsers } = useSelector((state: RootState) => state.dashboard);
    
    return (
        <div className='active_user_list_container'>
            {activeUsers.map((user) => (
                <ActiveUserItem key={user.socketId} user={user} />
            ))}
        </div>
    )
}

export default ActiveUserLists;
