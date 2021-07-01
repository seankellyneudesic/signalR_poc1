import React, { useState } from 'react';
import ChatUsers from './ChatUsers';

const SendDirectMessage = (props) => {
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = userId && userId !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            props.sendDirectMessage(userId, message);
        } 
        else {
            alert('Please select a user and a message.');
        }
    }

    const onSelectedUser = ({id}) => {
        setUserId(id);
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form 
            onSubmit={onSubmit}>
            <label htmlFor="user">Send to User:</label>
            <br />
                <ChatUsers users={props.users} onChange={onSelectedUser} />
            <br/>
            <label htmlFor="message">Message:</label>
            <br />
            <input 
                type="text"
                id="message"
                name="message" 
                value={message}
                onChange={onMessageUpdate} />
            <br/><br/>
            <button>Submit</button>
        </form>
    )
};

export default SendDirectMessage;