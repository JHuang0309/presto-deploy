import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const Modal = ({ type, onClose, isOpen }) => {
    if (type == 'textbox') {
        return (
            <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
    
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                Add {type}
                            </DialogTitle>
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                <div className='sm:col-span-3'>
                                    <label htmlFor="width" className="block text-sm/6 font-medium text-gray-900">
                                        Width (px)
                                    </label>
                                    <input
                                    id="width"
                                    name="width"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                                        Text
                                    </label>
                                        <textarea
                                        id="text"
                                        name="text"
                                        type="textarea"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                        defaultValue={''}
                                        placeholder="Enter your text here..."
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex w-full justify-center rounded-md bg-[#e4627d] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#eb7b91] sm:ml-3 sm:w-auto"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        data-autofocus
                        onClick={onClose}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Cancel
                    </button>
                    </div>
                </DialogPanel>
                </div>
            </div>
            </Dialog>
        );
    } else if (type == 'image') {
        return (
            <></>
        );
    } else if (type == 'video') {

    } else if (type == 'code') {

    } else {

    }
    
};

export default Modal