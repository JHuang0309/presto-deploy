const Video = ({ width, height, url, autoplay }) => {
  return (
    <div>
      {width}, {height}, {url}, {autoplay ? 'true' : 'false'}
    </div>
  );
};

export default Video;