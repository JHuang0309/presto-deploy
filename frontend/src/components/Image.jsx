import { Rnd } from 'react-rnd';

const Image = ({ width, height, image, description}) => {

  return (
    <Rnd>
      <img className={`w-${width} h-${height}`} src={`${image}`} alt={`${description}`}/>
    </Rnd>
  );
};


export default Image;
