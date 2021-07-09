import styled, { css } from 'styled-components';

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

const StyledLabel = styled.label`
    display: ${props => props.sideLabel ? 'inline-block' : 'inline'};
    min-width: ${props => props.sideLabel ? '150px' : 'inherit'};
    color: ${props => props.color || '#333'};
`;


const Input = (props) => {
    
    return (
        <>
        <StyledLabel htmlFor={props.name} color={props.labelColor} sideLabel={props.sideLabel}>{props.label}:</StyledLabel>        
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
