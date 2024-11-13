import { useState } from "react";
import MiniSlide from "./MiniSlide";

const ModalRearrangeSlidesInput = ({ updateUserInput, slideVersions }) => {
  const [slides, setSlides] = useState(
    slideVersions[slideVersions.length - 1].slides.map((slide, index) => ({
      ...slide,
      slideNumber: index + 1,
    }))
  );

  const saveRearrangement = (newSlides) => {
    setSlides(newSlides);
    updateUserInput(prevInput => ({
      ...prevInput,
      slides: newSlides
    }));
  };
  
  const swapSlides = (index, direction) => {
    const newSlides = [...slides];
    if (direction === "left" && index > 0) {
      const temp = newSlides[index];
      newSlides[index] = newSlides[index - 1];
      newSlides[index - 1] = temp;
    } else if (direction === "right" && index < slides.length - 1) {
      const temp = newSlides[index];
      newSlides[index] = newSlides[index + 1];
      newSlides[index + 1] = temp;
    }
    saveRearrangement(newSlides);
  }

  return (
    <div className="modal-content">
      <ul role="list" className="divide-y divide-gray-100 overflow-y-auto max-h-[600px] sm:justify-between">
        {slides.map((slide, index) => (
          <li key={slide.id} className="flex justify-between gap-x-6 py-5 sm:justify-between">
            <div className="flex gap-x-4">
              <MiniSlide format={slide.format} slideNumber={slide.slideNumber}/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div>
                <button
                  onClick={() => swapSlides(index, "left")}
                  disabled={index === 0}
                  className="text-gray-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
              </div>
              <div>
                <button
                  onClick={() => swapSlides(index, "right")}
                  disabled={index === slides.length - 1}
                  className="text-gray-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>  
  );
};
  
export default ModalRearrangeSlidesInput;