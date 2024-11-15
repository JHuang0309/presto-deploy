import { useRef } from 'react';
import { Rnd } from 'react-rnd';

const Textbox = ({ width, height, text, size, colour, position = { x: 0, y: 0 }, updatePosition }) => {
  const ref = useRef(null);

  const handleDragStop = (data) => {
    const newPosition = { x: data.x, y: data.y }
    updatePosition(newPosition);
  };

  return (
    <Rnd
      ref={ref}
      position={position}
      onDragStop={handleDragStop}
    >
      <div className={`w-${width} h-${height} text-${size}xl border border-gray-100 m-5`}>
        <p style={{color:`${colour}`}}>{text}</p>
      </div>
    </Rnd>
  );
};


export default Textbox;

