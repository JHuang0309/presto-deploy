import { useState } from 'react';
const Code = ({ width, height, code, size }) => {
    return (
        <div>
            {width} {height} {code} {size}
        </div>
    );
};

export default Code;