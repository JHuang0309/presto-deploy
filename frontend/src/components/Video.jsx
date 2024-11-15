import { Rnd } from 'react-rnd';

const Video = ({ width, height, url, autoplay }) => {
  let autoplayToggle = 1;
  if (autoplay === undefined) {
    autoplayToggle = 0;
  }
  return (
    <Rnd>
      <div className={`w-${width} h-${height}`}>
        <iframe width={`${width}`} height={`${height}`} src={`${url}?${autoplayToggle}`}>
        </iframe>
      
    </div>
    </Rnd>
    
  );
};

export default Video;

// import { useRef } from 'react';
// import { Rnd } from 'react-rnd';

// const Video = ({ width, height, url, autoplay, position = { x: 0, y: 0 }, updatePosition }) => {
//   const ref = useRef(null);

//   const handleDragStop = (event, data) => {
//     const newPosition = { x: data.x, y: data.y }
//     updatePosition(newPosition);
//   };

//   let autoplayToggle = 1;
//   if (autoplay === undefined) {
//     autoplayToggle = 0;
//   }
//   return (
//     <Rnd
//       ref={ref}
//       position={position}
//       onDragStop={handleDragStop}
//     >
//       <div className="resize">
//         <iframe width={`${width}`} height={`${height}`} src={`${url}?${autoplayToggle}`}>
//         </iframe>
//       </div>
//     </Rnd>
//   );
// };


// export default Video;