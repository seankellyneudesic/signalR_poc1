import styled, { css } from 'styled-components';

export const GridContainer = styled.div`
width: 100vw;
height: 100vh;
background: #000;
color: #fff;
`;

export const Grid = styled.div`          
padding: 0;    
margin: 0;
margin-left: 15px;
margin-right: 15px;
${props => props.noGutters && css`margin: 0; padding: 0;`}
display: flex;
flex-direction: column;
`;

export const Col = styled.div`
display: flex;
margin: 0;
padding: ${props => props.noGutters || '15px'};        
flex: ${props => props.flex || 1}   
${props => props.noGutters && css`padding: 0;`}
${props => props.start && css`justify-content:flex-start;`}
${props => props.end && css`justify-content:flex-end;`}
${props => props.center && css`justify-content:center;`}  
${props => props.spaceBetween && css`justify-content:space-between;`}  
${props => props.spaceAround && css`justify-content:space-around;`}  
${props => props.spaceEvenly && css`justify-content:space-evenly;`}  
`;

export const Row = styled.div`    
margin: 0;
padding: ${props => props.noGutters || '15px'};        
display: flex;    
flex-direction: row;    
${props => props.start && css`justify-content:flex-start;`}
${props => props.end && css`justify-content:flex-end;`}
${props => props.center && css`justify-content:center;`}  
${props => props.spaceBetween && css`justify-content:space-between;`}  
${props => props.spaceAround && css`justify-content:space-around;`}  
${props => props.spaceEvenly && css`justify-content:space-evenly;`}  
`;

