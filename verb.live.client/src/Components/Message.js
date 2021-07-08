import React from 'react';

const Message = (props) => (
    <div style={{ background: "#eee", borderRadius: '5px', padding: '0 5px'  }}>
        <div style={{ display: 'flex' , flex: 1, flexDirection: 'row', alignContent: "center", justifyContent: "flex-start", justifyItems: 'center' }}>
            <div style={{ padding: 5 }}>
                <strong>{props.user}</strong> says:
            </div>
            <div style={{ padding: 5, color: '#99f', fontWeight: 'bold' }}>
                {props.message}
            </div>
        </div>
    </div>
);

export default Message;