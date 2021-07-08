import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import SendDirectMessage from './SendDirectMessage';

const Chat = () => {
    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const [ currentUsers, setCurrentUsers ] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44372/hubs/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                    
                        setChat(updatedChat);
                    });

                    connection.on('ReceiveUsersUpdatedMessage', message => {                        
                        setCurrentUsers(message.updatedUsers);                        
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user,
            message,
        };

        if (connection.connectionStarted) {
            try {
                await connection.send('SendMessage', chatMessage);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }


    
    const sendDirectMessage = async (userId, message) => {
        const chatMessage = {
            userId,
            message,
        };

        if (connection.connectionStarted) {
            try {
                await connection.send('SendDirectMessage', chatMessage);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }
    return (
        <div style={{ width: '100%'}}>
            <ChatInput sendMessage={sendMessage} />
            <br/>            
            <SendDirectMessage users={currentUsers} sendDirectMessage={sendDirectMessage} />
            <br/>
            <ChatWindow chat={chat}/>
        </div>
    );
};

export default Chat;