import { Grid, Row, Col } from './FlexboxGrid';
import { FaBoxOpen } from "react-icons/fa";

const ButtonLink = (props) => {
    return (
        <div style={{ left: props.item.x, top: props.item.y, zIndex: 20, position: "absolute", color: '#fff', fontSize: 24 }}>                
            <Grid noGutters>
                <Row noGutters center>
                    <Col noGutters><FaBoxOpen height={32} width={32} alt="icon" /></Col>
                </Row>
                <Row noGutters center>
                    {props.item.message}
                </Row>
            </Grid>   
        </div>
    );
}

export default ButtonLink;