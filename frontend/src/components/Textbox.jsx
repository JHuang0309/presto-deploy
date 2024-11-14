import { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';

const Textbox = ({ width, height, text, size, colour, position, updatePosition }) => {
  const [positionState, setPositionState] = useState(position);
  const ref = useRef(null);

  const handleDragStop = (event, data) => {
    setPositionState({ x: data.x, y: data.y });
    const newPosition = { x: data.x, y: data.y }
    updatePosition(newPosition);
  };

  return (
    <Rnd
      ref={ref}
      default={{
        x: position.x,
        y: position.y,
        width,
        height,
      }}
      onDragStop={handleDragStop}
    >
      <div className={`w-${width} h-${height} text-${size}xl border border-gray-100 m-5`}>
        <p style={{color:`${colour}`}}>{text}</p>
      </div>
    </Rnd>
  );
};


export default Textbox;

