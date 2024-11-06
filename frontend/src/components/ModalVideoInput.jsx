import { useState } from 'react';

const ModalVideoInput = ({ updateUserInput }) => {

    const handleInput = (event) => {
        const { name, value } = event.target;
        updateUserInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    }

    const [autoPlay, setAutoPlay] = useState(false);
    const handleToggle = () => {
        setAutoPlay(!autoPlay);
        updateUserInput(prevInput => ({
            ...prevInput,
            'autoplay': !autoPlay
        }));
    };

    return (
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className='sm:col-span-3'>
                <label htmlFor="width" className="block text-sm/6 font-medium text-gray-900">
                    Width (px)
                </label>
                <input
                id="width"
                name="width"
                type="text"
                onChange={handleInput}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                />
            </div>
            <div className='sm:col-span-3'>
                <label htmlFor="height" className="block text-sm/6 font-medium text-gray-900">
                    Height (px)
                </label>
                <input
                id="height"
                name="height"
                type="text"
                onChange={handleInput}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                />
            </div>
            <div className="sm:col-span-6">
                <label htmlFor="url" className="block text-sm/6 font-medium text-gray-900">
                    Youtube Video URL
                </label>
                    <input
                    id="url"
                    name="url"
                    type="text"
                    onChange={handleInput}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                    placeholder="Enter a YouTube video URL here..."
                    />
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="autoPlay" className="block text-sm/6 font-medium text-gray-900 mb-1">
                    Auto-play on
                </label>
                <div className="relative inline-flex items-center">
                    <input
                        id="autoPlay"
                        name="autoPlay"
                        type="checkbox"
                        className='sr-only peer'
                        checked={autoPlay}
                        onChange={handleToggle}
                    />
                    <div
                        className="w-10 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out 
                                    peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#eb7b91] 
                                    peer-focus:ring-opacity-50 dark:bg-gray-700
                                    peer-checked:bg-[#e4627d] relative"
                        onClick={handleToggle}
                    >
                        <span className={`absolute top-1 left-1 block w-4 h-4 bg-white rounded-full shadow-md 
                             transition-transform duration-300 ease-in-out 
                             ${autoPlay ? "translate-x-4" : "translate-x-0"}`} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalVideoInput;