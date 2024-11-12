const ModalTextInput = ({ updateUserInput }) => {

    const handleInput = (event) => {
        const { name, value } = event.target;
        updateUserInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    }

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
                <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                    Enter text
                </label>
                    <textarea
                    id="text"
                    name="text"
                    type="textarea"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                    defaultValue={''}
                    placeholder="Enter your text here..."
                    onChange={handleInput}
                    />
            </div>
            <div className='sm:col-span-2'>
                <label htmlFor="fontSize" className="block text-sm/6 font-medium text-gray-900">
                    Font Size (em)
                </label>
                <input
                id="fontSize"
                name="fontSize"
                type="text"
                onChange={handleInput}
                placeholder='1.0'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                />
            </div>
            <div className='sm:col-span-2'>
                <label htmlFor="colour" className="block text-sm/6 font-medium text-gray-900">
                    Font Colour (HEX)
                </label>
                <input
                id="colour"
                name="colour"
                type="text"
                onChange={handleInput}
                placeholder='#FFFFFF'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                />
            </div>
        </div>
    );
}

export default ModalTextInput;