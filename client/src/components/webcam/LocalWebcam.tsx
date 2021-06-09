import React, { CSSProperties, FC, useEffect, useRef } from 'react'

interface StylesDictionary{
    [Key: string]: CSSProperties;
}

const styles: StylesDictionary = {
    videoContainer: {
        width: '150px',
        height: '150px',
        borderRadius: '8px',
        top: '5%',
        right: '23%',
        position: "absolute",
    },
    videoElement: {
        width: '100%',
        height: '100%'
    }
};

interface LocalWebcamProps {
    localStream: Object
}

const LocalWebcam: FC<LocalWebcamProps> = ({ localStream }) => {
    const localVideoRef = useRef<any>();

    useEffect(() => {
        if (localStream) {
            const localVideo = localVideoRef.current;
            localVideo.srcObject = localStream;
            localVideo.onloadedmetadata = () => {
                localVideo?.play();
            }
        }
    }, [localStream]);

    return (
        <div style={styles.videoContainer} className='background_secondary_color'>
            <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
        </div>
    )
}

export default LocalWebcam