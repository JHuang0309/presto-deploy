import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import ModalImageInput from './ModalImageInput';
import ModalTextInput from './ModalTextInput';
import ModalVideoInput from './ModalVideoInput';
import ModalCodeInput from './ModalCodeInput';
import ModalBackgroundInput from './ModalBackgroundInput';
import ModalTitleInput from './ModalTitleInput';
import ModalThumbnailInput from './ModalThumbnailInput';
import Alert from './Alert';


const Inputs = ({type, updateUserInput, title, thumbnail}) => {
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
  } else if (type == 'editThumbnail') {
    return (
      <ModalThumbnailInput updateUserInput={updateUserInput} thumbnail={thumbnail}/>
    );
  } else {
    console.log(`Error unknown add element button: ${type}`)
  }
}

const Modal = ({ type, onClose, isOpen, addTextbox, addImage, addVideo, addCode, addFormat, deletePres, editTitle, presTitle, editThumbnail, presThumbnail }) => {
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
    } else if (type == 'editThumbnail') {
      setModalType('Edit Thumbnail');
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
      const {width, height, url} = userInput;
      if (width <= 0 || width == undefined) {
        handleInvalidInputs('Invalid width. Width must be at greater than 0px');
      } else if (height <= 0 || height == undefined) {
        handleInvalidInputs('Invalid height. Height must be at greater than 0px');
      } else if (url == undefined || url == '') {
        handleInvalidInputs('Invalid url. Url cannot be empty');
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
    } else if (type == 'editThumbnail') {
      const { thumbnail } = userInput
      editThumbnail(thumbnail);
    } else {
      handleInvalidInputs('Error unknown element type')
    }
  }

  
};

export default Modal