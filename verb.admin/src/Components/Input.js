import styled from 'styled-components';

const StyledInput = styled.input`
    font-size: 16pt;
    padding: 10px;
    margin: 10px;
    background: #fff;  
    border: solid 1px #eee;
    border-radius: 3px;
    ::placeholder {
        color: #ddd;
    }
`;


const Input = (props) => {
    
    return (
        <>
        <label htmlFor={props.name}>{props.label}:</label>        
        <br />
        <StyledInput id={props.name}
                name={props.name} 
                value={props.value}
                onChange={props.onChange} />
        <br />
        </>        
    );
}

export default Input;
