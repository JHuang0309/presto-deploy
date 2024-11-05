import { useState } from 'react';

const ModalImageInput = () => {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const [base64String, setBase64String] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileRead();
            reader.onloadend = () => {
                setBase64String(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const handleConvertUrlToBase64 = async () => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64String(reader.result);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error fetching the image:', error);
        }
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                />
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="image" className="block text-sm/6 font-medium text-gray-900">
                    Image 
                </label>
                    <input
                    id="image"
                    name="image"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6 mb-3"
                    value={url}
                    placeholder="Enter image URL"
                    onChange={handleUrlChange}
                    />
                    <input
                    id="image-file"
                    name="image-file"
                    type="file"
                    value={url}
                    accept="image/*"
                    onChange={handleFileChange}
                    className='text-sm'
                    />
            </div>
            <div className='sm:col-span-6'>
                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                    Description
                </label>
                <input
                id="description"
                name="description"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                />
            </div>           
        </div>
    );
}

export default ModalImageInput;