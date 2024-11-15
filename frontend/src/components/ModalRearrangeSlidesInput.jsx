import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import MiniSlide from "./MiniSlide";

const ModalRearrangeSlidesInput = ({ updateUserInput, slideVersions }) => {
  if (!slideVersions) {
    return;
  }
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

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedSlides = Array.from(slides);
    const [movedSlide] = reorderedSlides.splice(source.index, 1);
    reorderedSlides.splice(destination.index, 0, movedSlide);

    saveRearrangement(reorderedSlides);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="slides">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              role="list"
              className="divide-y divide-gray-100 overflow-y-auto max-h-[600px] sm:justify-between"
            >
              {slides.map((slide, index) => (
                <Draggable key={slide.id} draggableId={slide.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex justify-between gap-x-6 py-5 sm:justify-between"
                      data-testid={`slide-item-${index}`}
                    >
                      <div className="flex gap-x-4">
                        <MiniSlide format={slide.format} slideNumber={slide.slideNumber} />
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <button
                          onClick={() => swapSlides(index, "left")}
                          disabled={index === 0}
                          className="text-gray-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                          </svg>
                        </button>
                        <button
                          onClick={() => swapSlides(index, "right")}
                          disabled={index === slides.length - 1}
                          className="text-gray-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>  
  );
};
  
export default ModalRearrangeSlidesInput;