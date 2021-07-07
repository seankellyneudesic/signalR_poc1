import './App.css';
import Chat from './Components/Chat';
import Video from './Components/Video';
import Overlays from './Components/Overlays';

import styled, { css } from 'styled-components';

const GridContainer = styled.div`
width: 100vw;
height: 100vh;
background: #000;
color: #fff;
`;

const Grid = styled.div`          
padding: 0;    
margin: 0;
margin-left: 15px;
margin-right: 15px;
display: flex;
flex-direction: column;
`;

const Col = styled.div`
display: flex;
margin: 0;
padding: 15px;        
flex: ${props => props.flex || 1}   
${props => props.noGutters && css`margin-left: -15px; margin-right: -15px;`}
${props => props.start && css`justify-content:flex-start;`}
${props => props.end && css`justify-content:flex-end;`}
${props => props.center && css`justify-content:center;`}  
${props => props.spaceBetween && css`justify-content:space-between;`}  
${props => props.spaceAround && css`justify-content:space-around;`}  
${props => props.spaceEvenly && css`justify-content:space-evenly;`}  
`;

const Row = styled.div`    
margin: 0;
padding: 15px;
display: flex;    
flex-direction: row;    
${props => props.noGutters && css`margin-left: -15px; margin-right: -15px;`}
${props => props.start && css`justify-content:flex-start;`}
${props => props.end && css`justify-content:flex-end;`}
${props => props.center && css`justify-content:center;`}  
${props => props.spaceBetween && css`justify-content:space-between;`}  
${props => props.spaceAround && css`justify-content:space-around;`}  
${props => props.spaceEvenly && css`justify-content:space-evenly;`}  
`;

function App() {  
  return (   
    <GridContainer>
      <Grid>
        <Row><h2 style={{ textAlign: 'center'}}>Verb Live Client</h2></Row>
        <Row>
          <Col flex={2}>
            <Video>
              <Overlays />
            </Video>
          </Col>
          <Col flex={1}><Chat /></Col>
        </Row>
      </Grid>
    </GridContainer>  
  );
}

export default App;
