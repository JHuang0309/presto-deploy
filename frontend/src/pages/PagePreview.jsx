import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slide from '../components/Slide';

function PagePreview() {
    // takes in elements, format, and slide number via url
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const elements = JSON.parse(decodeURIComponent(queryParams.get('elements')));
    const format = JSON.parse(decodeURIComponent(queryParams.get('format')));
    const slideNumber = queryParams.get('slideNum');

    console.log(elements)
    console.log(format);

    return (
        <>
            <div className='p-4'>
                {/* pass in slide components
                <Slide elements={} format={}/> */}
                {/* Slide: {elements}, {format}, {slideNumber} */}
            </div>
            <div className='bg-white border-t-2 border-gray-300 shadow-sm p-4 flex flex-1 items-start min-w-[340px]'>
                <div className='flex items-center'>
                    <button 
                        className={`text-sm rounded p-2 transition duration-200 ${slideNumber == 1 ? 'text-gray-500 cursor-not-allowed opacity-50' : 'text-gray-900 hover:bg-gray-100'}`}
                        disabled={slideNumber == 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                        </svg>
                        Prev
                    </button>
                    <span className='ml-2 mr-2 text-gray-400 font-semibold'>
                        {slideNumber}
                    </span>
                    <button className='text-sm text-gray-900 hover:bg-gray-100 hover:bg-gray-100 rounded p-2 transition duration-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                        </svg>
                        Next
                    </button>
                </div>
            </div>
            
        </>
    )
}

export default PagePreview;