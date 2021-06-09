import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { callStates } from 'store/reducers/callReducer';
import LocalWebcam from '../webcam/LocalWebcam';
import IncomingCall from './IncomingCall';
import CallingDialog from './CallingDialog';

const DirectCall = () => {
    const { localStream, callState, callerUsername, callingDialogVisible } = useSelector((state: RootState) => state.call);


    return (
        <>
            <LocalWebcam localStream={localStream} />
            {callState === callStates.CALL_REQUESTED && <IncomingCall callerUsername={callerUsername} />}
            {callingDialogVisible && <CallingDialog />}
        </>
    )
}

export default DirectCall
