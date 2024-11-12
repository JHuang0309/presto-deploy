import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import ModalImageInput from './ModalImageInput';
import ModalTextInput from './ModalTextInput';
import ModalVideoInput from './ModalVideoInput';
import ModalCodeInput from './ModalCodeInput';
import ModalBackgroundInput from './ModalBackgroundInput';
import ModalTitleInput from './ModalTitleInput';
import Alert from './Alert';


const Inputs = ({type, updateUserInput, title}) => {
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
    } else if (type == 'format') {
        return (
            <ModalBackgroundInput updateUserInput={updateUserInput}/>
        );
    } else if (type == 'deletePres') {
        return (
            <p>Are you sure you want to delete this presentation?</p>
        );
    } else if (type == 'editTitle') {
        return (
            <ModalTitleInput updateUserInput={updateUserInput} title={title}/>
        );
    } else {
        console.log(`Error unknown add element button: ${type}`)
    }
}

const Modal = ({ type, onClose, isOpen, addTextbox, addImage, addVideo, addCode, addFormat, deletePres, editTitle, presTitle }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [modalType, setModalType] = useState(''); // tracks the type of modal
    const [alertType, setAlertType] = useState('alert');
    const [alertMsg, setAlertMsg] = useState('');
    const [userInput, setUserInput] = useState({});
    const updateUserInput = (value) => {
        setUserInput(value);
    };

    useEffect(() => {
        const addTypes = ['textbox', 'image', 'code', 'video']
        if (addTypes.includes(type)) {
            setModalType(`Add ${type}`);
        } else if (type == 'format') {
            setModalType('Format slide background');
        } else if (type == 'deletePres') {
            setModalType('Delete presentation');
        } else if (type == 'editTitle') {
            setModalType('Edit Title');
        }
    })

    const closeModal = () => {
        if (!showAlert) onClose();
    }

    const handleInvalidInputs = (alertMessage) => {
        setAlertType('alert');
        setAlertMsg(alertMessage);
        setShowAlert(true);
    }

    const handleModalProcess = (type) => {
        const isValidHex = (hex) => /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
        if (type == 'textbox') {
            const { width, height, text, fontSize, colour } = userInput;
            if (width <= 0 || width == undefined) {
                handleInvalidInputs('Invalid width. Width must be at greater than 0px');
            } else if (height <= 0 || height == undefined) {
                handleInvalidInputs('Invalid height. Height must be at greater than 0px');
            } else if (text == undefined || text == '') {
                handleInvalidInputs('Invalid text. Text cannot be empty');
            } else if (fontSize <= 0 || fontSize == undefined) {
                handleInvalidInputs('Invalid font size. Font size must be greater than 0');
            } else if (!isValidHex(colour)) {
                handleInvalidInputs('Invalid colour. Please enter a valid hex color.');
            } else {
                addTextbox(userInput);
                onClose();
            }
        } else if (type == 'image') {
            const {width, height, image, description} = userInput;
            if (width <= 0 || width == undefined) {
                handleInvalidInputs('Invalid width. Width must be at greater than 0px');
            } else if (height <= 0 || height == undefined) {
                handleInvalidInputs('Invalid height. Height must be at greater than 0px');
            } else if (image == undefined || image == '') {
                handleInvalidInputs('Invalid image. Image cannot be empty');
            } else if (description == undefined || description == '') {
                handleInvalidInputs('Invalid description. Description cannot be empty');
            } else {
                addImage(userInput);
                onClose();
            }
        } else if (type == 'video') {
            const {width, height, url, autoplay} = userInput;
            if (width <= 0 || width == undefined) {
                handleInvalidInputs('Invalid width. Width must be at greater than 0px');
            } else if (height <= 0 || height == undefined) {
                handleInvalidInputs('Invalid height. Height must be at greater than 0px');
            } else if (url == undefined || url == '') {
                handleInvalidInputs('Invalid url. Url cannot be empty');
            } else if (fontSize <= 0 || fontSize == undefined) {
                handleInvalidInputs('Invalid font size. Font size must be greater than 0');
            } else {
                addVideo(userInput);
                onClose();   
            }
            
        } else if (type == 'code') {
            const {width, height, text, fontSize} = userInput;
            if (width <= 0 || width == undefined) {
                handleInvalidInputs('Invalid width. Width must be at greater than 0px');
            } else if (height <= 0 || height == undefined) {
                handleInvalidInputs('Invalid height. Height must be at greater than 0px');
            } else if (text == undefined || text == '') {
                handleInvalidInputs('Invalid code. Code cannot be empty');
            } else if (fontSize <= 0 || fontSize == undefined) {
                handleInvalidInputs('Invalid font size. Font size must be greater than 0');    
            } else {
                addCode(userInput);
                onClose();   
            }
        } else if (type == 'format') {
            if (userInput.format == 'solid') {
                if (!isValidHex(userInput.colour)) {
                    handleInvalidInputs('Invalid colour. Please enter a valid hex color.');
                    return;
                }
            } else if (userInput.format == 'gradient') {
                if (!isValidHex(userInput.startColour)) {
                    handleInvalidInputs('Invalid start colour. Please enter a valid hex color.');
                    return;
                } else if (!isValidHex(userInput.endColour)) {
                    handleInvalidInputs('Invalid end colour. Please enter a valid hex color.');
                    return;
                }
            } else if (userInput.format == 'image') {
                if (userInput.image == undefined) {
                    handleInvalidInputs('Invalid image url. Please input a valid image.');
                    return;
                }
            } else if (userInput.format == undefined) {    
                handleInvalidInputs('Invalid background format. Select a format type');
                return;
            }
            addFormat(userInput);
            onClose();
        } else if (type == 'deletePres') {
            deletePres();
        } else if (type == 'editTitle') {
            const { title } = userInput
            if (title == undefined) {
                return;
            } else if (title == '') {
                editTitle('Untitled presentation');
            } else {
                editTitle(title);
            }
        } else {
            handleInvalidInputs('Error unknown element type')
        }
    }

    return (

        <Dialog open={isOpen} onClose={closeModal} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            {showAlert && (
                <Alert 
                    message={alertMsg}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                            {modalType}
                        </DialogTitle>
                        <Inputs type={type} updateUserInput={updateUserInput} title={presTitle}/>
                    </div>
                </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between">
                <button
                    type="button"
                    onClick={() => handleModalProcess(type)}
                    className="inline-flex w-full justify-center rounded-md bg-[#e4627d] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#eb7b91] sm:ml-3 sm:w-auto"
                >
                    {modalType}
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