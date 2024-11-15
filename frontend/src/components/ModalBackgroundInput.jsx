import { useState, useEffect } from 'react';

const ModalBackgroundInput = ({ updateUserInput }) => {
  const [url, setUrl] = useState('');

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
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        updateUserInput(prevInput => ({
          ...prevInput,
          'image': base64
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    setUrl(newUrl);
    if (newUrl) {
      handleConvertUrlToBase64(newUrl);
    }
  }

  const handleConvertUrlToBase64 = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        updateUserInput(prevInput => ({
          ...prevInput,
          'image': base64
        }));
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error fetching the image:', error);
    }
  };

  const [style, setStyle] = useState('');
  const [styleInputs, setStyleInputs] = useState(null);

  const setFormat = (select) => {
    setStyle(select);
    updateUserInput(() => ({
      'format' : select
    }));
    // set default
    if (select == 'gradient') {
      updateUserInput(prevInput => ({
        ...prevInput,
        'gradientDirection' : 'top-down'
      }));
    }
  }

  useEffect(() => {
    const renderInputs = () => {
      switch(style) {
      case 'solid':
        return (
          <div className="sm:col-span-6">
            <label htmlFor="colour" className="block text-sm font-medium text-gray-900">
              Colour
            </label>
            <input
              id="colour"
              name="colour"
              type="text"
              onChange={handleInput}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e4627d] focus:ring-[#e4627d]"
              placeholder="#000000"
            />
          </div>
        );
      case 'gradient':
        updateUserInput(prevInput => ({
          ...prevInput,
          'gradientDirection': 'top-down'
        }));
        return (
          <>
            <div className="sm:col-span-3">
              <label htmlFor="startColour" className="block text-sm font-medium text-gray-900">
                Start Colour
              </label>
              <input
                id="startColour"
                name="startColour"
                type="text"
                onChange={handleInput}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e4627d] focus:ring-[#e4627d]"
                placeholder="#000000"
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="endColour" className="block text-sm font-medium text-gray-900">
                End Colour
              </label>
              <input
                id="endColour"
                name="endColour"
                type="text"
                onChange={handleInput}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e4627d] focus:ring-[#e4627d]"
                placeholder="#FFFFFF"
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="gradientDirection" className="block text-sm font-medium text-gray-900">
                Gradient Direction
              </label>
              <select
                id="gradientDirection"
                name="gradientDirection"
                onChange={handleInput}
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-[#e4627d] focus:ring-[#e4627d]"
              >
                <option value="top-down">Top to Down</option>
                <option value="left-right">Left to Right</option>
              </select>
            </div>
          </>
        );
      case 'image':
        return (
          <>
            <div className="sm:col-span-6">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900">
                Image URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                onChange={handleUrlChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e4627d] focus:ring-[#e4627d]"
                placeholder="Enter image URL"
              />
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="imageFile" className="block text-sm font-medium text-gray-900">
                Upload Image
              </label>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 mt-1"
              />
            </div>
          </>
        );
      }
    }
    setStyleInputs(renderInputs());
  }, [style]);

  return (
    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
      <div className="flex flex-col sm:col-span-6">
        <div>
          <input
            type="radio"
            name="fillType"
            value="solid"
            className="form-radio text-[#e4627d] focus:ring-[#eb7b91] mr-2"
            onChange={() => setFormat('solid')}
          />
          <span className="text-gray-700">Solid fill</span>
        </div>
        <div>
          <input
            type="radio"
            name="fillType"
            value="gradient"
            className="form-radio text-[#e4627d] focus:ring-[#eb7b91] mr-2"
            onChange={() => setFormat('gradient')}
          />
          <span className="text-gray-700">Gradient fill</span>
        </div>
        <div>
          <input
            type="radio"
            name="fillType"
            value="image"
            className="form-radio text-[#e4627d] focus:ring-[#eb7b91] mr-2"
            onChange={() => setFormat('image')}
          />
          <span className="text-gray-700">Picture fill</span>
        </div>
      </div>
      {styleInputs}
    </div>
  );
}

export default ModalBackgroundInput;