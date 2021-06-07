import React, { FC } from 'react'
import { activeUsers } from 'fakeData';
import ActiveUserItem from './ActiveUserItem';


const ActiveUserLists: FC = () => {
    return (
        <div className='active_user_list_container'>
            {activeUsers.map((user) => (
                <ActiveUserItem key={user.socketId} user={user} />
            ))}
        </div>
    )
}

export default ActiveUserLists
