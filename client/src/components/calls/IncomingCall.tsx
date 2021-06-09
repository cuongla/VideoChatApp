import React, { FC } from 'react'

interface IncomingCallProps {
    callerUsername: string
}

const IncomingCall: FC<IncomingCallProps> = ({ callerUsername }) => {
    const onAcceptCall = () => {
        // accept the call
    };

    const onRejectCall = () => {
        // accept the call
    };

    return (
        <div className='call_dialog background_secondary_color'>
            <span className='call_dialog_caller_name'>{callerUsername}</span>
            <div className='call_dialog_button_container'>
                <button className='call_dialog_accept_button' onClick={onAcceptCall}>
                    Accept
          </button>
                <button className='call_dialog_reject_button' onClick={onRejectCall}>
                    Reject
          </button>
            </div>
        </div>
    )
}

export default IncomingCall
