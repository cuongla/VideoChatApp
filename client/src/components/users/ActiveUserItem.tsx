import React, { FC } from 'react'
import { IUser } from 'typings/userTypes'
import userAvatar from 'resources/user-avatar.png';

interface ActiveUserItemProps {
    user: IUser
}

const ActiveUserItem: FC<ActiveUserItemProps> = ({ user }) => {
    const handlePress = () => {

    }

    return (
        <div className="active_user_list_item" onClick={handlePress}>
            <div className="active_user_list_image_container">
                <img 
                    src={userAvatar} 
                    alt="user avatar" 
                    className="active_user_list_image" />
            </div>
            <div className="active_user_list_text">{user.username}</div>
        </div>
    )
}

export default ActiveUserItem
