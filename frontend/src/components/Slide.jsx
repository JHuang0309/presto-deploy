import { useState } from 'react';

const Slide = ({ elements, format }) => {
    // console.log(elements)
    // console.log(format)
    if (elements == null || format == null) {
        return (
            <>
                <div className='bg-white aspect-[16/9] max-w-full min-w-[300px] max-h-[800px] m-10'>
                </div>
            </>
        );
    }
    return (
        <>
            <div className='bg-white aspect-[16/9] max-w-full min-w-[300px] max-h-[800px] m-10'>
                {elements.map((Element, index) => (
                    <div key={index}>
                        {Element}
                    </div>
                ))}
            </div>
        </>
        
    );
};

export default Slide;