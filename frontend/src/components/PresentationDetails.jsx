import React from 'react';

function PresentationDetails({ isOpen, newPresentation, handleInputChange, createPresentation, closeModal }) {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 overflow-auto">
      <div className="relative mx-auto p-4 w-full max-w-md mt-20">
        <div className="shadow rounded-lg bg-white overflow-hidden">
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              New Presentation
            </h3>
            <button onClick={closeModal} type="button" className="focus:outline-none">
              <span className="text-gray-500 font-bold text-2xl cursor-pointer">×</span>
            </button>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newPresentation.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e4627d] focus:border-[#e4627d] sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newPresentation.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e4627d] focus:border-[#e4627d] sm:text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 hover:bg-[#e4627d] text-white font-bold py-2 px-4 rounded"
                onClick={createPresentation}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationDetails;