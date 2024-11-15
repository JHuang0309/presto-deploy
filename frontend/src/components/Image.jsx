import { useRef } from 'react';
import { Rnd } from 'react-rnd';

const Image = ({ width, height, image, description, position = { x: 0, y: 0 }, updatePosition }) => {
  // const ref = useRef(null);

  // const handleDragStop = (event, data) => {
  //   const newPosition = { x: data.x, y: data.y }
  //   updatePosition(newPosition);
  // };

  return (
    <Rnd
      // ref={ref}
      // position={position}
      // onDragStop={handleDragStop}
    >
      <img className={`w-${width} h-${height}`} src={`${image}`} alt={`${description}`}/>
    </Rnd>
  );
};


export default Image;
