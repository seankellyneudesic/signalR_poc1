import './App.css';
import Chat from './Components/Chat';
import Video from './Components/Video';
import Overlays from './Components/Overlays';

import { GridContainer, Grid, Row, Col } from './Components/FlexboxGrid';

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
