import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import SendDirectMessage from './SendDirectMessage';

const Chat = () => {
    const [ connection, setConnection ] = useState(null);
    
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

    return (
        <div>      
            <button onClick={generateImageContent}>Generate Image Content</button>
            <button onClick={generateButtonContent}>Generate Button Content</button>
        </div>
    );
};

export default Chat;