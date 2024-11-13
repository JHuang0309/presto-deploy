import { useEffect, useState } from "react";

const ModalRearrangeSlidesInput = ({ updateUserInput, slideVersions }) => {
  const [slides, setSlides] = useState(slideVersions[slideVersions.length - 1].slides);

  const saveRearrangement = () => {
    updateUserInput(prevInput => ({
      ...prevInput,
      slides: slides // Save the new order of the slides
    }));
  };

  console.log(slides);
  
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
    setSlides(newSlides);
  }

  return (
    <div className="modal-content">
      <div className="flex justify-center space-x-4">
        {/* Map through slides and display each slide with arrows */}
        {slides.map((slide, index) => (
          <div key={slide.id} className="text-center">
            <div className="slide-item">
              {/* Display slide content (could be text, image, etc.) */}
              <div>{slide.id}</div>

              {/* Arrow buttons to move the slide */}
              <div className="flex justify-center space-x-2">
                {/* Left arrow */}
                <button
                  onClick={() => swapSlides(index, "left")}
                  disabled={index === 0}
                  className="px-2 py-1 bg-gray-300 text-white rounded hover:bg-gray-400"
                >
                  {"<"}
                </button>
                
                {/* Right arrow */}
                <button
                  onClick={() => swapSlides(index, "right")}
                  disabled={index === slides.length - 1}
                  className="px-2 py-1 bg-gray-300 text-white rounded hover:bg-gray-400"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>  
  );
};
  
export default ModalRearrangeSlidesInput;