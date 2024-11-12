const ModalTitleInput = ({ updateUserInput, title }) => {

    const handleInput = (event) => {
        const { name, value } = event.target;
        updateUserInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    }
    return (
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-12">
                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900 mb-2">
                    Enter Presentation Title
                </label>
                <input
                id="title"
                name="title"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e4627d] sm:text-sm/6"
                placeholder="Enter title..."
                defaultValue={title}
                onChange={handleInput}
                />
            </div>
        </div>
    );
}

export default ModalTitleInput;