import React from 'react';

const DirectMessage = (props) => (
    <div style={{ background: "#eee", borderRadius: '5px', padding: '0 5px'  }}>
        <div style={{ display: 'flex' , flex: 1, flexDirection: 'row', alignContent: "center", justifyContent: "flex-start", justifyItems: 'center' }}>
            <div style={{ padding: 5 }}>
                <strong>{props.fromUser}</strong> says to <strong>{props.user}</strong>:
            </div>
            <div style={{ padding: 5, color: '#99f', fontWeight: 'bold' }}>
                {props.message}
            </div>
        </div>
    </div>
);

export default DirectMessage;