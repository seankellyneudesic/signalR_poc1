import React from 'react';
import styled from 'styled-components';

const Dropdown = styled.select`
    padding: 5px 45px 5px 10px;
    font-size: 1.2rem;
    line-height: 1.4rem;
    font-weight: 500;
    color: black;
    border: 2px solid black;
    height: 36px;
    border-radius: 0;        
    margin: 10px;
`;

const ChatUsers = (props) => {

    const handleOnChange = (e) => {
        if (props.onChange)
            props.onChange({ id: e.target.value });
    }

    return(
        <>
        <Dropdown onChange={handleOnChange}>
       {props.users && props.users.map((user, index) => (
           <option value={user.id} key={user.id}>{user.name}</option>        
        ))}
        </Dropdown>
    </>);
};

export default ChatUsers;