import React, { useEffect } from 'react'
import ActiveUserLists from 'components/users/ActiveUserLists';
import { getLocalStream } from 'utils/WebRTCLogic';
import DirectCall from 'components/calls/DirectCall';

const DashboardPage = () => {
    useEffect(() => {
        getLocalStream()
    }, []);

    return (
        <div className='dashboard_container background_primary_color'>
            <div className='dashboard_left_section'>
                <div className='dashboard_content_container'>
                    <DirectCall />
                </div>
                <div className='dashboard_rooms_container background_secondary_color'>
                    rooms
                </div>
            </div>
            <div className='dashboard_right_section background_secondary_color'>
                <div className='dashboard_active_users_list'>
                    <ActiveUserLists />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;
