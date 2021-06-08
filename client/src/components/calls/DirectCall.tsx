import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import CameraView from './CameraView';
import SelfCameraView from './SelfCameraView';

interface DirectCallProsp {

}

const DirectCall = () => {
    const { localStream } = useSelector((state: RootState) => state.call);


    return (
        <>
            <CameraView localStream={localStream} />
        </>
    )
}

export default DirectCall
