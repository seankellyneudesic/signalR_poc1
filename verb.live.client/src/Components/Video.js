import React from 'react';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  
const WebcamCapture = (props) => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );

    return (
        <>
        <div style={{ height: '100%', minHeight: 800, width: '100%', position: 'relative' }}>
            <div style={{ height: '100%', width: '100%', position: 'absolute', left: 0, top: 0, zIndex: 1 }}>
            <Webcam
                audio={false}
                height={'100%'}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={'100%'}                
                videoConstraints={videoConstraints}
            />  
            </div>
            {props.children}            
        </div>
        {/* <button onClick={capture}>Capture photo</button> */}
        </>
    );
};

export default WebcamCapture;