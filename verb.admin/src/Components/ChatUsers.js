import React from 'react';

const ChatUsers = (props) => {

    const handleOnChange = (e) => {
        if (props.onChange)
            props.onChange({ id: e.target.value });
    }

    return(
        <>
        <select onChange={handleOnChange}>
       {props.users && props.users.map((user, index) => (
           <option value={user.id} key={user.id}>{user.name}</option>        
        ))}
        </select>
    </>);
};

export default ChatUsers;