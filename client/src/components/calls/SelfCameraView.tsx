import React, { FC, useEffect, useRef } from 'react'

interface SelfCameraViewProps {
    remoteStream: Object
}

const SelfCameraView: FC<SelfCameraViewProps> = ({ remoteStream }) => {
    const localVideoRef = useRef<any>();

    useEffect(() => {
        if(remoteStream) {
            const localVideo = localVideoRef.current;
            localVideo.srcObject = remoteStream;
            localVideo.onloadedmetadata = () => {
                localVideo?.play();
            }
        }
    }, [remoteStream]);

    return (
        <div className="background_secondary_color selfCameraViewContainer">
            <video 
                className="selfCameraViewElement"
                ref={localVideoRef}
                autoPlay
                muted>
            </video>
        </div>
    )
}

export default SelfCameraView
