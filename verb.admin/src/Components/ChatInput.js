import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

const ChatInput = (props) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            props.sendMessage(user, message);
        } 
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onUserUpdate = (e) => {
        setUser(e.target.value);
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form 
            onSubmit={onSubmit}>
            <Input id="user" 
                name="user" 
                label="Username"
                value={user}
                onChange={onUserUpdate} />
            
            <Input id="message" 
                name="message" 
                label="Message"
                value={message}
                onChange={onMessageUpdate} />

            <Button>Send Broadcast Message</Button>
        </form>
    )
};

export default ChatInput;