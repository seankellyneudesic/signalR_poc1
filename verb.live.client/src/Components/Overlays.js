import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

  
const Overlays = (props) => {
    const [ connection, setConnection ] = useState(null);
    const [ overlays, setOverlays ] = useState([]);
    const latestOverlays = useRef(null);

    latestOverlays.current = overlays;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44372/hubs/overlay')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('ReceiveOverlayPlace', message => {
                        const updatedOverlays = [...latestOverlays.current];
                        updatedOverlays.push(message);                    
                        setOverlays(updatedOverlays);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const ImageLink = (props) => {
        return (
        <div style={{ height: '100%', width: '100%', position: 'absolute', left: props.item.x, top: props.item.y, zIndex: 20 }}>
            <div style={{ left: "150px", top: "150px", position: "absolute", color: '#fff', fontSize: 24 }}>{props.item.message}</div>
        </div>
        );
    }

    const ButtonLink = (props) => {
        return (
        <div style={{ height: '100%', width: '100%', position: 'absolute', left: props.item.x, top: props.item.y, zIndex: 20 }}>
            <div style={{ left: "150px", top: "150px", position: "absolute", color: '#fff', fontSize: 24 }}>{props.item.message}</div>
        </div>
        );
    }

    const renderOverlayComponent = (overlay) => {
        switch (overlay.overlayType) {
            case 'buttonlink':
                return <ButtonLink item={overlay} />;
            case 'imagelink':            
            default:
                return <ImageLink item={overlay} />;
        }
    }

    return (
        <>
        {overlays.map(overlay => renderOverlayComponent(overlay))}        
        </>
    );
};

export default Overlays;

