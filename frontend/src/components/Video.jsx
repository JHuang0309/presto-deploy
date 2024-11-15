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

