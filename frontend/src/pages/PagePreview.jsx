import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Slide from '../components/Slide';

function PagePreview() {
  // takes in slides, and slide number via url
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const slides = JSON.parse(decodeURIComponent(queryParams.get('slides')))
  const slideNumber = parseInt(useParams().slideNumber);

  const [slideIndex, setSlideIndex] = useState(slideNumber)

  const [slideFormat, setSlideFormat] = useState(slides[slideIndex - 1].format)
  const [slideElements, setSlideElements] = useState(slides[slideIndex - 1].elements)

  const changeSlide = (direction) => {
    if (direction == 'next') {
      const newIndex = parseInt(slideIndex) + 1;
      setSlideIndex(newIndex);
    } else {
      const newIndex = parseInt(slideIndex) - 1;
      setSlideIndex(newIndex);
    }
  }

  useEffect(() => {
    const currentSlide = slides[slideIndex];
    if (currentSlide) {
      setSlideFormat(currentSlide.format);
      setSlideElements(currentSlide.elements);
    }
  }, [slideIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' && slideIndex < slides.length) {
        changeSlide('next');
      } else if (event.key === 'ArrowLeft' && slideIndex > 1) {
        changeSlide('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slideIndex]);

  useEffect(() => {
    if (slideIndex !== slideNumber) {
      navigate(`/preview/${slideIndex}${location.search}`, { replace: true });
    }   
  }, [slideIndex, navigate]);

  return (
    <>
      <div className='p-4'>
        <Slide elements={slideElements} format={slideFormat}/>
        {/* Slide: {elements}, {format}, {slideNumber} */}
      </div>
      <div className='bg-white border-t-2 border-gray-300 shadow-sm p-4 flex flex-1 items-start min-w-[340px]'>
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
            className={`text-sm p-2 transition duration-200 rounded ${slideIndex == slides.length ? 'text-gray-500 cursor-not-allowed opacity-50' : 'text-gray-900 hover:bg-gray-100 hover:bg-gray-100'}`}
            disabled={slideIndex == slides.length}
            onClick={() => {changeSlide('next')}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
            </svg>
            Next
          </button>
        </div>
      </div>
      
    </>
  )
}

export default PagePreview;