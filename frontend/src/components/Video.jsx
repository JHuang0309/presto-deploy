import { useState } from 'react';
const Video = ({ width, height, url, autoplay }) => {
    return (
        <div>
            {width}, {height}, {url}, {autoplay}
        </div>
    );
};

export default Video;