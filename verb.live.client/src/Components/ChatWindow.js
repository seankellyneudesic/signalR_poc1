import React from 'react';

import Message from './Message';

const ChatWindow = (props) => {
    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            user={m.user}
            message={m.message}/>);

    return(
        <div style={{ color: '#333', minHeight: 200, border: 'solid 1px #eee', borderRadius: 15, background: '#fff' }}>
            {chat}
        </div>
    )
};

export default ChatWindow;