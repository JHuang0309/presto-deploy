import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import ModalImageInput from './ModalImageInput';
import ModalTextInput from './ModalTextInput';
import ModalVideoInput from './ModalVideoInput';
import ModalCodeInput from './ModalCodeInput';


const Inputs = ({type, updateUserInput}) => {
    if (type == 'textbox') {
        return (
            <ModalTextInput updateUserInput={updateUserInput}/>
        );
    } else if (type == 'image') {
        return (
            <ModalImageInput updateUserInput={updateUserInput}/>
        );
    } else if (type == 'video') {
        return (
            <ModalVideoInput updateUserInput={updateUserInput}/>
        );
    } else if (type == 'code') {
        return (
            <ModalCodeInput updateUserInput={updateUserInput}/>
        );
    } else {
        console.log(`Error unknown add element button: ${type}`)
    }
}

const Modal = ({ type, onClose, isOpen, addTextbox, addImage, addVideo, addCode }) => {

    const [userInput, setUserInput] = useState({});
    const updateUserInput = (value) => {
        setUserInput(value);
    };

    const handleAddElement = (type) => {
        console.log(type);
        if (type == 'textbox') {
            addTextbox(userInput);
            onClose();
        } else if (type == 'image') {
            addImage(userInput);
            onClose();
        } else if (type == 'video') {
            addVideo(userInput);
            onClose();
        } else if (type == 'code') {
            addCode(userInput);
            onClose();
        } else {
            console.log(`Error unknown element type: ${type}`)
        }
    }

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
                        <Inputs type={type} updateUserInput={updateUserInput}/>
                    </div>
                </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between">
                <button
                    type="button"
                    onClick={() => handleAddElement(type)}
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
};

export default Modal