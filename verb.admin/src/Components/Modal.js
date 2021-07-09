import styled from "styled-components";
import PropTypes from 'prop-types';
import React from "react";
import Button from './Button';
// These are the only possible openPos values
export const CM_CENTER_CENTER = Symbol('CM_CENTER_CENTER');
export const CM_TOP_LEFT = Symbol('CM_TOP_LEFT');
export const CM_TOP_CENTER = Symbol('CM_TOP_CENTER');
export const CM_TOP_RIGHT = Symbol('CM_TOP_RIGHT');

// These are private components

// Modal background layer - visible or invisible, but always floating above client's elements
const Modal = styled.div`
    z-index: auto;
    display: ${({show}) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.5);
    z-index: 100;    
`;

// Rendered popup - a positional demo confirmation box
const Container = styled.div` 
    position:fixed;
    background: rgba(31,31,31,0.6);
    width: 33%;
    height: auto;
    backdrop-filter: blur(15px);

    top: ${({openPos}) => (
    {
        [CM_CENTER_CENTER]: '50%',
        [CM_TOP_LEFT]: '10%',
        [CM_TOP_CENTER]: '10%',
        [CM_TOP_RIGHT]: '10%'
    }[openPos])};
    
    left: ${({openPos}) => (
    {
        [CM_CENTER_CENTER]: '50%',
        [CM_TOP_LEFT]: '5%',
        [CM_TOP_CENTER]: '50%',
        [CM_TOP_RIGHT]: '95%'
    }[openPos])};
  
    transform: ${({openPos}) => (
    {
        [CM_CENTER_CENTER]: 'translate(-50%,-50%)',
        [CM_TOP_LEFT]: 'translate(0,0)',
        [CM_TOP_CENTER]: 'translate(-50%,0)',
        [CM_TOP_RIGHT]: 'translate(-100%,0)'
    }[openPos])};
    border-radius: 8px;
    padding: 2rem;
    color: rgba(0,0,139, 0.9);
`;


const Header = styled.div`
    font-size: 1.8rem;
    color: #c123de;
`;

const HBar = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(80,80,150, 0.4);
`;

const ButtonBar = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    justify-content: flex-end;
`;

const Slot = styled.div`
    font-size: 1.6rem;
    color: inherit;
`;

export default function ConfirmationModalImpl(props) {
    const {
        handleClose, // renderProp fn returns true or false
        show, // boolean - visible/invisible
        headerText, // text
        detailText, // html / inner text
        openPos // symbol for placement
    } = { ...props };

    const sendYes = () => handleClose(true);
    const sendNo = () => handleClose(false);

    return (
        <Modal show={show}>
            <Container openPos={openPos}>
                <Header>{headerText}</Header>                
                <Slot>{detailText}</Slot>
                <ButtonBar>
                    <Button onClick={sendYes} primary={true}>Yes</Button>
                    <Button onClick={sendNo} primary={false}>No</Button>
                </ButtonBar>
            </Container>
        </Modal>
    );
}

ConfirmationModalImpl.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    headerText: PropTypes.string.isRequired,
    detailText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    openPos: PropTypes.symbol.isRequired
};