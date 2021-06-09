import React, { FC, useEffect, useRef } from 'react'

const styles = {
    videoContainer: {
        width: '100%',
        height: '100%'
    },
    videoElement: {
        width: '100%',
        height: '100%'
    }
};

interface RemoteWebcamProps {
    remoteStream: Object
}

const RemoteWebcam: FC<RemoteWebcamProps> = ({ remoteStream }) => {
    const remoteVideoRef = useRef<any>();

    useEffect(() => {
        if (remoteStream) {
            const remoteVideo = remoteVideoRef.current;
            remoteVideo.srcObject = remoteStream;

            remoteVideo.onloadedmetadata = () => {
                remoteVideo.play();
            };
        }
    }, [remoteStream]);

    return (
        <div style={styles.videoContainer}>
            <video style={styles.videoElement} ref={remoteVideoRef} autoPlay />
        </div>
    )
}

export default RemoteWebcam;