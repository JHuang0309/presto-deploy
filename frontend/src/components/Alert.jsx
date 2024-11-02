import { useState } from 'react';

const Alert = ({message, type, onClose }) => {
    const alertType = {
        error: 'bg-red-100 text-red-700',
    }
    return (
        <div className='fixed flex w-full justify-center z-50 '>
            <div className={`flex items-center p-4 mb-4 rounded-md min-w-[350px] md:min-w-[500px] ${alertType[type]}`}>
                <div className='flex-grow'>{message}</div>
                <button onClick={onClose} className="ml-4 text-red-500 hover:text-red-700">
                    &times;
                </button>
            </div>
        </div>
        
    );
};

export default Alert