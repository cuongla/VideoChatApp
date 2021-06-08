import React, { FC, useEffect, useRef } from 'react'


interface CameraViewProps {
    localStream: Object
}

const CameraView: FC<CameraViewProps> = ({ localStream }) => {
    const localVideoRef = useRef<any>();

    useEffect(() => {
        if(localStream) {
            const localVideo = localVideoRef.current;
            localVideo.srcObject = localStream;
            localVideo.onloadedmetadata = () => {
                localVideo?.play();
            }
        }
    }, [localStream]);

    return (
        <div className="background_secondary_color videoContainer">
            <video 
                className="videoElement"
                ref={localVideoRef}
                autoPlay
                muted>
            </video>
        </div>
    )
}

export default CameraView
