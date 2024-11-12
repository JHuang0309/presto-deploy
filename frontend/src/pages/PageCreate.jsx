import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
    const [token, setToken] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const [alertMsg, setAlertMsg] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [versions, setVersions] = useState(JSON.parse(queryParams.get("versions")));
    const [presTitle, setPresTitle] = useState(queryParams.get("title"))
    const presId = useState(queryParams.get("id"))[0];
    const [thumbnail, setThumbnail] = useState(queryParams.get("thumbnail"))
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

    const [slideIndex, setSlideIndex] = useState(1)

    // Replace empty object with slide properties
    const [slideFormat, setSlideFormat] = useState(versions[versions.length - 1].slides[slideIndex - 1].format)
    const handleAddFormat = (formatObject) => {
        setSlideFormat(formatObject);
    }

    // Pass in list of elements as the default instead of the empty list []
    // Add a useEffect to store all slideElements to the store
    const [slideElements, setSlideElements] = useState(versions[versions.length - 1].slides[slideIndex - 1].elements)
    const handleAddTextbox = ({width, height, text, fontSize, colour}) => {
        setSlideElements(elems => [
            ...elems,
            <Textbox width={width} height={height} text={text} size={fontSize} colour={colour} />
        ])
    }
    const handleAddImage = ({width, height, image, description}) => {
        setSlideElements(elems => [
            ...elems,
            <Image width={width} height={height} image={image} description={description} />
        ])
    }
    const handleAddVideo = ({width, height, url, autoplay}) => {
        setSlideElements(elems => [
            ...elems,
            <Video width={width} height={height} url={url} autoplay={autoplay} />
        ])
    }
    const handleAddCode = ({width, height, text, fontSize}) => {
        setSlideElements(elems => [
            ...elems,
            <Code width={width} height={height} code={text} size={fontSize} />
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
        newStore.presentations[presIndex].thumbnail = newThumbnail;
        setStoreFn(newStore);
        setIsModalOpen(false);
        setAlertType('success');
        setAlertMsg('Thumbnail changed successfully');
        setShowAlert(true);
    }

    const changeSlide = (direction) => {
        if (direction == 'next') {
            const newIndex = slideIndex + 1;
            setSlideIndex(newIndex);
        } else {
            const newIndex = slideIndex - 1;
            setSlideIndex(newIndex);
        }
    }

    useEffect(() => {
        const currentSlide = versions[versions.length - 1].slides[slideIndex - 1];
        if (currentSlide) {
            setSlideFormat(currentSlide.format);
            setSlideElements(currentSlide.elements);
        }
    }, [slideIndex]);

    return (
        <>
            {showAlert && (
                <Alert 
                    message={alertMsg}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                />
            )}
            {isModalOpen && (
                <Modal 
                    type={modalType}
                    onClose={handleCloseModal}
                    isOpen={isModalOpen}
                    addTextbox={handleAddTextbox}
                    addImage={handleAddImage}
                    addVideo={handleAddVideo}
                    addCode={handleAddCode}
                    addFormat={handleAddFormat}
                    deletePres={handleDeletePres}
                    editTitle={handleEditTitle}
                    presTitle={presTitle}
                    editThumbnail={handleEditThumbnail}
                    presThumbnail={thumbnail}
                />
            )}
             <div className='lg:flex lg:items-center lg:justify-between pb-6 pl-6 pr-6 border-b-2 border-gray-300 shadow-sm p-4'>
                <div className="min-w-0 flex-1">
                    <div className='flex items-end'>
                        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-2">
                            {presTitle}
                        </h2>
                        <button 
                            className='ml-2 pb-3'
                            onClick={() => handleOpenModal('editTitle')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <Link to='/dashboard' className="mt-2 flex items-center text-sm text-gray-500 hover:bg-gray-100 hover:bg-gray-100 rounded p-2 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                            Return to dashboard
                        </Link>
                        <button 
                            className="mt-2 flex items-center text-sm text-gray-500 hover:bg-gray-100 rounded p-2 transition duration-200"
                            onClick={() => handleOpenModal('editThumbnail')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            Change thumbnail
                        </button>
                        <button className="mt-2 flex items-center text-sm text-gray-500 hover:bg-gray-100 rounded p-2 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            Edit version history
                        </button>
                    </div>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                    <span>
                        <button 
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => handleOpenModal('deletePres')}
                        >
                            Delete presentation
                        </button>
                        {/* add further buttons here */}
                    </span>
                </div>
            </div>
            <div className='flex h-screen'>
                {/* Main page body */}
                {isOpen && (
                    <aside className='flex flex-col p-6 h-full px-3 py-4 overflow-y-auto md:w-60 sm:w-30'>
                        <div>
                            <button 
                                className='flex bg-[#e4627d] items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#eb7b91] dark:hover:bg-gray-700 w-full text-white mb-2 xs:text-xs sm:text-sm md:text-base'
                                onClick={() => handleAddSlide()}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                                Create new slide
                            </button>
                        </div>
                        <div>
                            <button 
                                onClick={() => handleOpenModal('textbox')}
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full mb-2 xs:text-xs sm:text-sm md:text-base'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                </svg>
                                Add textbox
                            </button>
                        </div>
                        <div>
                            <button 
                                onClick={() => handleOpenModal('image')}
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full mb-2 xs:text-xs sm:text-sm md:text-base'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                Add image
                            </button>
                        </div>
                        <div>
                            <button 
                                onClick={() => handleOpenModal('video')}
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full mb-2 xs:text-xs sm:text-sm md:text-base'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                </svg>
                                Add video
                            </button>
                        </div>
                        <div>
                            <button 
                                onClick={() => handleOpenModal('code')}
                                className='flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full mb-2 xs:text-xs sm:text-sm md:text-base text-gray-900'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                                </svg>
                                Add code
                            </button>
                        </div>
                        <div>
                            <button className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full mb-2 xs:text-xs sm:text-sm md:text-base'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                                </svg>
                                Add transition
                            </button>
                        </div>
                        <div className='mt-auto'>
                            <button 
                                onClick={() => handleOpenModal('format')}
                                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full mb-2 xs:text-xs sm:text-xs md:text-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                                Format slide background
                            </button>
                        </div>
                    </aside>
                )}
                <button onClick={toggleSidebar} className='hover:bg-gray-100 hover:bg-gray-100'>
                    {isOpen && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    )}
                    {!isOpen && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    )}
                </button>
                <div className='flex-1 bg-gray-100 overflow-auto flex flex-col'>
                    <Slide elements={slideElements} format={slideFormat}/>
                    <div className='bg-white border-t-2 border-gray-300 shadow-sm p-4 flex flex-1 items-start min-w-[340px] justify-between'>
                        <div className='flex items-center'>
                            <button 
                                className={`text-sm p-2 transition duration-200 rounded ${slideIndex == 1 ? 'text-gray-500 cursor-not-allowed opacity-50' : 'text-gray-900 hover:bg-gray-100 hover:bg-gray-100'}`}
                                disabled={slideIndex == 1}
                                onClick={() => {changeSlide('prev')}}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                                </svg>
                                Prev
                            </button>
                            <span className='ml-2 mr-2 text-gray-400 font-semibold'>
                                {slideIndex}
                            </span>
                            <button 
                                className={`text-sm p-2 transition duration-200 rounded ${slideIndex == versions[versions.length - 1].slides.length ? 'text-gray-500 cursor-not-allowed opacity-50' : 'text-gray-900 hover:bg-gray-100 hover:bg-gray-100'}`}
                                disabled={slideIndex == versions[versions.length - 1].slides.length}
                                onClick={() => {changeSlide('next')}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                                </svg>
                                Next
                            </button>
                        </div>
                        <div className='sm:ml-4 flex'>
                            <button className='text-sm text-gray-900 hover:bg-gray-100 hover:bg-gray-100 rounded p-2 transition duration-200 flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                                </svg>
                                Rearrange slides
                            </button>
                            <button 
                                className='text-sm text-gray-900 hover:bg-gray-100 hover:bg-gray-100 rounded p-2 transition duration-200 flex items-center'
                                onClick={() => {
                                    const data = {
                                        slides: JSON.stringify(versions[versions.length - 1].slides),
                                        slideNum: slideIndex
                                    };
                                    const queryString = new URLSearchParams(data).toString();
                                    window.open(`/preview?${queryString}`, '_blank');
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                                </svg>
                                Preview
                            </button>
                        </div>
                        <div>
                            <button 
                                className='text-sm text-gray-900 hover:bg-gray-100 hover:bg-gray-100 rounded p-2 transition duration-200 flex items-center'
                                onClick={() => deleteSlide()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                Delete slide
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* slide arrangement section */}
            </div>
        </>
    );
}

export default PageCreate;