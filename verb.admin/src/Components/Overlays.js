import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ButtonLink from './ButtonLink';
import ImageLink from './ImageLink';
import Button from './Button';
import ConfirmationModal from './Modal';
import * as Pos from './Modal';
import Input from './Input';
import { Grid, Row } from './FlexboxGrid';

const Chat = () => {
    const [ connection, setConnection ] = useState(null);
    const [ overlays, setOverlays ] = useState([]);
    const latestOverlays = useRef(null);
    const [title, setTitle] = useState('');
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);
    const [icon, setIcon] = useState('');
    const [url, setUrl] = useState('');

    const [show, setShow] = useState(false);
    const showModal = () => {
        setTitle('');
        setXPos(0);
        setYPos(0);
        setIcon('');
        setUrl('');
        setShow(true);
    };
    
    const hideModal = (arg) => {
        setShow(false);        
        sendMessage({ message: title, overlayType: 'imagelink', x: parseInt(xPos), y: parseInt(yPos), url});        
    };

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

    const sendMessage = async ({ message, overlayType, x, y}) => {
        const chatMessage = {            
            message, overlayType, x, y
        };

        if (connection.connectionStarted) {
            try {
                await connection.send('OverlayPlace', chatMessage);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }


    const generateImageContent = () => {
        const x = Math.round((Math.random() * 800));
        const y = Math.round((Math.random() * 600));
        const message = Math.round(Math.random() * 1) === 1 ? 'Hello': 'Greetings';
        const overlayType = "imagelink";
        sendMessage({ message, overlayType, x, y});
    }

    const generateButtonContent = () => {
        const x = Math.round((Math.random() * 800));
        const y = Math.round((Math.random() * 600));
        const message = Math.round(Math.random() * 1) === 1 ? 'Goodbye': 'See ya';
        const overlayType = "buttonlink";
        sendMessage({ message, overlayType, x, y});
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

    const onTitleUpdate = (e) => {
        setTitle(e.target.value);
    }
    
    const onUrlUpdate = (e) => {
        setUrl(e.target.value);
    }

    const onIconUpdate = (e) => {
        setIcon(e.target.value);
    }

    const onXPosUpdate = (e) => {
        setXPos(e.target.value);
    }

    const onYPosUpdate = (e) => {
        setYPos(e.target.value);
    }


    const renderForm = () => {
        return (
            <Grid>
                <Row vCenter>                    
                <Input id="d_title" 
                    name="d_title" 
                    label="Title"
                    labelColor={'#fff'}
                    sideLabel
                    value={title}
                    onChange={onTitleUpdate} 
                />
                </Row>
                <Row vCenter>
                <Input id="d_xpos" 
                    name="d_xpos" 
                    label="X Position"
                    labelColor={'#fff'}
                    value={xPos}
                    sideLabel
                    onChange={onXPosUpdate} 
                />
                </Row>       
                <Row vCenter>
                <Input id="d_ypos" 
                    name="d_ypos" 
                    label="Y Position"
                    labelColor={'#fff'}
                    value={yPos}
                    sideLabel
                    onChange={onYPosUpdate} 
                />
                </Row>       
                <Row vCenter>                
                <Input id="d_url" 
                    name="d_url" 
                    label="URL"
                    labelColor={'#fff'}
                    value={url}
                    sideLabel
                    onChange={onUrlUpdate} 
                />
                </Row>
                <Row vCenter>
                <Input id="d_icon" 
                    name="d_icon" 
                    label="Icon"
                    labelColor={'#fff'}
                    value={icon}
                    sideLabel
                    onChange={onIconUpdate} 
                />
                </Row>                
            </Grid>
        )
    }

    return (
        <>
        <div style={{ height: '100%', width: '100%', position: 'absolute', left: 0, top: 0 }}>
            {overlays.map(overlay => (<React.Fragment key={overlay.resourceId}>{renderOverlayComponent(overlay)}</React.Fragment>))}
            <div style={{ left: 50, bottom: 50, zIndex: 30, position: "absolute", color: '#fff', fontSize: 24 }}> 
                <Button onClick={showModal}>Generate Image Content</Button>
                <Button onClick={generateButtonContent}>Generate Button Content</Button>
            </div>
        </div>        
        <ConfirmationModal
            show={show}
            headerText="Generate Image Content"
            handleClose={hideModal}
            openPos={Pos.CM_CENTER_CENTER}
            detailText={renderForm()}>            
        </ConfirmationModal>
        </>
    );
};

export default Chat;