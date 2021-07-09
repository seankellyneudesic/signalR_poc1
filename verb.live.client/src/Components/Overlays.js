import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ButtonLink from './ButtonLink';
import ImageLink from './ImageLink';
  
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
        <div style={{ height: '100%', width: '100%', position: 'absolute' }}>
            {overlays.map(overlay => (<React.Fragment key={overlay.resourceId}>{renderOverlayComponent(overlay)}</React.Fragment>))}
        </div>
    );
};

export default Overlays;

