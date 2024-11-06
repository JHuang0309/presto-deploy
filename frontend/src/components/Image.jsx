import { useState } from 'react';
const Image = ({ width, height, image, description }) => {
    return (
        <div>
            {width}, {height}, {image}, {description}
        </div>
    );
};

export default Image;