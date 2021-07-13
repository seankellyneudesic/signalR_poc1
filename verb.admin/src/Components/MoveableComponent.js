import React, {useEffect, useRef, useState} from 'react';
import Moveable from "react-moveable";

const MovableComponent = ({ moveRef, onMoveEvent }) => {        
    const [frame, setFrame] = useState({ left: 0, top: 0 });

    const setTransform = (target) => {
        target.style.transform = setTranslate(frame.left, frame.top);
    }

    const setTranslate = (left, top) => {
        return `translateX(${left}px) translateY(${top}px)`;
    }
  
    const onDrag = ({ beforeTranslate, target }) => {
        setFrame({ left: beforeTranslate[0], top: beforeTranslate[1] })        
        setTransform(target);
    };

    const onDragEnd = ({ clientX, clientY }) => {
        if (onMoveEvent)
            onMoveEvent({ y: frame.top, x: frame.left })
    }

    const onDragStart = ({ set }) => {
        set([frame.left, frame.top]);
    };  
  
    return (
      <Moveable        
        target={moveRef}
        draggable={true}
        snappable={true}
        onDrag={onDrag}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        bounds={{ position: 'css', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    );
  };
  
  export default MovableComponent;