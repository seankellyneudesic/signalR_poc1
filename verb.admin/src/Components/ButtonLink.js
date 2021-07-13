import React, {useRef} from 'react';
import { Grid, Row, Col } from './FlexboxGrid';
import { FaBoxOpen } from "react-icons/fa";
import MovableComponent from './MoveableComponent';

const ButtonLink = (props) => {        

    const movableElementRef = useRef(null);

    return (        
        <>        
        <Grid noGutters style={{ height: "100px", width: "100px", position: "absolute", left: `${props.item.x}px`, top: `${props.item.y}px`, zIndex: 1100}} ref={movableElementRef}>
            <Row noGutters center>
                <Col noGutters><FaBoxOpen height={32} width={32} alt="icon" /></Col>
            </Row>
            <Row noGutters center>
                {props.item.message}
            </Row>
        </Grid>   
        <MovableComponent moveRef={movableElementRef} onMoveEvent={({x,y}) => props.onMoveEvent({x, y, resourceId: props.item.resourceId})} />
        </>
    );
}

export default ButtonLink;