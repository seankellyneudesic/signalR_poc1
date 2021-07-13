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
    const overlayContainer = useRef(null);
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
            .withUrl('https://localhost:5001/hubs/overlay')
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

    const sendMessage = async ({ message, overlayType, x, y, resourceId}) => {
        const chatMessage = {            
            message, overlayType, x, y, resourceId
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

    const sendMoveMessage = async (msg) => {    
        if (connection.connectionStarted) {
            try {
                await connection.send('OverlayMove', msg);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

    const generateImageContent = () => {        
        var rq = {
            x: Math.round(Math.random() * 800),
            y: Math.round(Math.random() * 600),
            message: Math.round(Math.random() * 1) === 1 ? 'Goodbye': 'See ya',
            resourceId: uuidv4(),
            overlayType: "imagelink"
        };
        sendMessage(rq);
    }

    const generateButtonContent = () => {
        var rq = {
            x: Math.round(Math.random() * 800),
            y: Math.round(Math.random() * 600),
            message: Math.round(Math.random() * 1) === 1 ? 'Goodbye': 'See ya',
            resourceId: uuidv4(),
            overlayType: "buttonlink"
        };                
        sendMessage(rq);
    }

    const handleMoveEvent = (msg) => {
        //x, y, resourceId
        sendMoveMessage(msg);
    }

    const renderOverlayComponent = (overlay, overlayContainer) => {
        switch (overlay.overlayType) {
            case 'buttonlink':
                return <ButtonLink item={overlay} overlayContainer={overlayContainer} onMoveEvent={handleMoveEvent} />;
            case 'imagelink':            
            default:
                return <ImageLink item={overlay} overlayContainer={overlayContainer}  onMoveEvent={handleMoveEvent}/>;
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
        <div style={{ height: '100%', width: '100%', position: 'absolute', left: 0, top: 0 }} ref={overlayContainer}>
            {overlays.map(overlay => (<React.Fragment key={overlay.resourceId}>{renderOverlayComponent(overlay, overlayContainer)}</React.Fragment>))}            
            <div style={{ left: 0, bottom: 50, zIndex: 30, position: "absolute", color: '#fff', fontSize: 24 }}> 
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