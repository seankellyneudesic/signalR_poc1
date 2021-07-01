import React from 'react';

const ChatUser = (props) => (
    <div style={{ background: "#eee", borderRadius: '5px', padding: '0 5px'  }}>
        <div style={{ display: 'flex' , flex: 1, flexDirection: 'row', alignContent: "center", justifyContent: "center", justifyItems: 'center' }}>
            <div style={{ padding: 5 }}>
                <strong>{props.id}</strong>
            </div>
            <div style={{ padding: 5 }}>
                <strong>{props.name}</strong>
            </div>
        </div>
    </div>
);

export default ChatUser;