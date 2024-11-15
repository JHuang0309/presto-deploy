const ModalTransitionInput = ({ updateUserInput }) => {

  const handleInput = (event) => {
    const { name, value } = event.target;
    updateUserInput(prevInput => ({
    ...prevInput,
    [name]: value
    }));
  }
  
  return (
    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <label htmlFor="transition" className="block text-sm font-medium text-gray-700 mb-2">
          Select Transition
        </label>
        <select
          id="transition"
          name="transition"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleInput}
        >
          <option value="swipe-left">Swipe left</option>
          <option value="swipe-right">Swipe right</option>
          <option value="fade-in">Fade in</option>
          <option value="fade-out">Fade out</option>
        </select>
      </div>
    </div>
  );
}

export default ModalTransitionInput;