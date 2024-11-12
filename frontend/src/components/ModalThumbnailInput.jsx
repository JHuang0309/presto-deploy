import { useState } from 'react';

const ModalThumbnailInput = ({ updateUserInput, thumbnail }) => {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);

    const handleInput = (event) => {
        const { name, value } = event.target;
        updateUserInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setUrl('');
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                updateUserInput(prevInput => ({
                    ...prevInput,
                    'thumbnail': base64
                }));
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    const handleUrlChange = (event) => {
        const newUrl = event.target.value;
        setUrl(newUrl);
        setFile(null);
        if (newUrl) {
            handleConvertUrlToBase64(newUrl);
        }
    }

    const handleConvertUrlToBase64 = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                updateUserInput(prevInput => ({
                    ...prevInput,
                    'thumbnail': base64
                }));
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error fetching the image:', error);
        }
    };
    return (
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label htmlFor="image" className="block text-sm/6 font-medium text-gray-900">
                    Enter Thumbnail Image 
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
                    accept="image/*"
                    onChange={handleFileChange}
                    className='text-sm'
                    />
            </div>
        </div>
    );
}

export default ModalThumbnailInput;