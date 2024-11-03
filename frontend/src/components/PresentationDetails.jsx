import React from 'react';

function PresentationDetails({ isOpen, newPresentation, handleInputChange, createPresentation, closeModal }) {
  if (!isOpen) return null; // Avoid rendering when modal is closed

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 overflow-auto">
      <div className="relative mx-auto p-4 w-full max-w-md mt-20">
        <div className="shadow rounded-lg bg-white overflow-hidden">
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              New Presentation
            </h3>
            <button onClick={closeModal} type="button" className="focus:outline-none">
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.707 3.307a1 1 0 00-1.414 0L0 6.014l4.293 4.293a1 1 0 001.414-1.414L4 6.014V4.707a1 1 0 10-1.414-1.414L0 4.293l4.293 4.293a1 1 0 001.414 0L4 4.293v1.414zM15.293 16.693a1 1 0 001.414 0L20 13.386l-4.293-4.293a1 1 0 00-1.414 1.414L15.293 13.386v1.414a1 1 0 101.414 1.414l-4.293-4.293a1 1 0 00-1.414 0L15.293 16.693z"
                  clipRule="evenodd"
                />
              </svg>
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
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