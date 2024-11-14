import { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';

const Textbox = ({ width, height, text, size, colour }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleDragStop = (event, data) => {
    setPosition({ x: data.x, y: data.y });
    console.log("New position:", data.x, data.y); // Log the position to the console
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

