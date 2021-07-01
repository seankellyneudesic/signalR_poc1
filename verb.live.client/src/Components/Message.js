import React from 'react';

const Message = (props) => (
    <div style={{ background: "#eee", borderRadius: '5px', padding: '0 5px'  }}>
        <div style={{ display: 'flex' , flex: 1, flexDirection: 'row', alignContent: "center", justifyContent: "center", justifyItems: 'center' }}>
            <div style={{ padding: 5 }}>
                <strong>{props.user}</strong> says:
            </div>
            <div style={{ padding: 5 }}>
                {props.message}
            </div>
        </div>
    </div>
);

export default Message;