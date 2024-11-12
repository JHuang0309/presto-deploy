import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Slide from '../components/Slide';
import Modal from '../components/Modal';
import Textbox from '../components/Textbox';
import Code from '../components/Code';
import Image from '../components/Image';
import Video from '../components/Video';
import Alert from '../components/Alert.jsx';

function PageCreate() {
  const { presentationId, slideNumber } = useParams();
  const [token, setToken] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [alertMsg, setAlertMsg] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [versions, setVersions] = useState(null);
  const [presTitle, setPresTitle] = useState(queryParams.get("title"))
  const presId = useState(queryParams.get("id"))[0];
  const [thumbnail, setThumbnail] = useState(queryParams.get("thumbnail"))
  const [slideIndex, setSlideIndex] = useState(slideNumber);
  const [numSlides, setNumSlides] = useState(1);
  const [slideElements, setSlideElements] = useState(null);
  const [slideFormat, setSlideFormat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate('/login');
    } else {
      setToken(localStorage.getItem('token'));
    }
  }, [navigate]);

  const [store, setStore] = useState(null);
  const setStoreFn = (newStore) => {
    axios.put(
      'http://localhost:5005/store',
      {
        store: newStore,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        setStore(newStore);
      })
      .catch((error) => {
        setAlertType('error');
        setAlertMsg(error.response.data.error);
        setShowAlert(true);
      });
  };
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5005/store', {
        headers: {Authorization: `Bearer ${token}`}
      })
        .then((response) => {
          setStore(response.data.store);
          const presentation = response.data.store.presentations.find(p => p.id === presId);
          if (presentation) {
            setPresTitle(presentation.title);
            setThumbnail(presentation.thumbnail);
            setVersions(presentation.versions);
            setNumSlides(presentation.versions[presentation.versions.length - 1].slides.length);
            const currentSlide = presentation.versions[presentation.versions.length - 1].slides[slideIndex - 1];
            if (currentSlide) {
              setSlideFormat(currentSlide.format);
              setSlideElements(currentSlide.elements);
            }
          }
        }) 
        .catch((error) => {
          localStorage.removeItem('token');
          navigate('/login');
          console.log(error.response.data.error);
        });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (store && presId) {
      const presentation = store.presentations.find(p => p.id === presId);
      if (presentation) {
        setPresTitle(presentation.title);
        setThumbnail(presentation.thumbnail);
        setVersions(presentation.versions);
        setNumSlides(presentation.versions[presentation.versions.length - 1].slides.length);
      }
    }
  }, [store, presId])

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  const [modalType, setModalType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  const handleAddFormat = (formatObject) => {
    setSlideFormat(formatObject);
  }
  const handleAddTextbox = ({width, height, text, fontSize, colour}) => {
    setSlideElements(elems => [
      ...elems,
      <Textbox key={uuidv4()} width={width} height={height} text={text} size={fontSize} colour={colour} />
    ])
  }
  const handleAddImage = ({width, height, image, description}) => {
    setSlideElements(elems => [
      ...elems,
      <Image key={uuidv4()} width={width} height={height} image={image} description={description} />
    ])
  }
  const handleAddVideo = ({width, height, url, autoplay}) => {
    setSlideElements(elems => [
      ...elems,
      <Video key={uuidv4()} width={width} height={height} url={url} autoplay={autoplay} />
    ])
  }
  const handleAddCode = ({width, height, text, fontSize}) => {
    setSlideElements(elems => [
      ...elems,
      <Code key={uuidv4()} width={width} height={height} code={text} size={fontSize} />
    ])
  }
  const handleDeletePres = () => {
    const newStore = { ...store };
    newStore.presentations = newStore.presentations.filter(
      (presentation) => presentation.id !== presId
    );
    
    setStoreFn(newStore);
    setIsModalOpen(false);
    navigate('/dashboard')
  }
  const handleAddSlide = () => {
    const newStore = { ...store };
    const presIndex = newStore.presentations.findIndex(p => p.id === presId);
    const newSlides = [...newStore.presentations[presIndex].versions[versions.length - 1].slides];
    newSlides.push({
      id: uuidv4(),
      presentationId: presId,
      elements: [],
      format: {format: 'solid', colour: '#FFFFFF'},
    })
    newStore.presentations[presIndex].versions = newStore.presentations[presIndex].versions.map(version => {
      if (version.presentationId === presId) {
        return { ...version, slides: newSlides };
      }
      return version;
    });
    setStoreFn(newStore);
    setVersions(newStore.presentations[presIndex].versions);
    setIsModalOpen(false);
    changeSlide('next');
  }
  const deleteSlide = () => {
    const newStore = { ...store };
    const presIndex = newStore.presentations.findIndex(p => p.id === presId);
    const newSlides = [...newStore.presentations[presIndex].versions[versions.length - 1].slides];
    if (newSlides.length == 1) {
      handleOpenModal('deletePres');
      return;
    }
    newSlides.splice(slideIndex - 1, 1);
    newStore.presentations[presIndex].versions[versions.length - 1].slides = newSlides;
    setStoreFn(newStore);
    setVersions(newStore.presentations[presIndex].versions);
    if (slideIndex == 1) {
      setSlideIndex(slideIndex);
    } else {
      setSlideIndex(slideIndex - 1);
    }
    setNumSlides(numSlides - 1);
  }
  const handleEditTitle = (newTitle) => {
    const newStore = { ...store };
    const presIndex = newStore.presentations.findIndex(p => p.id === presId);
    newStore.presentations[presIndex].title = newTitle;
    setStoreFn(newStore);
    setIsModalOpen(false);
  }
  const handleEditThumbnail = (newThumbnail) => {
    const newStore = { ...store };
    const presIndex = newStore.presentations.findIndex(p => p.id === presId);
 