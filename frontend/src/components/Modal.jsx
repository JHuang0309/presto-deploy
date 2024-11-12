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



export default Modal