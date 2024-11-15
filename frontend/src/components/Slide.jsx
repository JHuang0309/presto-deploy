import { useState, useEffect } from 'react';
import Textbox from '../components/Textbox';
import Image from '../components/Image';
import Video from '../components/Video';
import Code from '../components/Code';

const Slide = ({ elements, format, updateElements }) => {
  // transition property is also available
  const [slideFormat, setSlideFormat] = useState({});
  useEffect(() => {
    const jsxFormat = {}
    if (format.format === "solid") {
      jsxFormat.backgroundColor = format.colour;
    } else if (format.format === "gradient") {
      const gradientDirection = 
        format.gradientDirection === "left-right" ? "to right" :
          format.gradientDirection === "top-down" ? "to bottom" : "to right";
      jsxFormat.background = `linear-gradient(${gradientDirection}, ${format.startColour}, ${format.endColour})`;
    } else if (format.format === "image") {
      jsxFormat.backgroundImage = `url(${format.image})`;
      jsxFormat.backgroundSize = "cover";
      jsxFormat.backgroundPosition = "center";
    }
    setSlideFormat(jsxFormat);
  }, [format]);

  const [elementsState, setElementsState] = useState(elements);
  useEffect(() => {
    if (elements) {
      setElementsState(elements);
    }
  }, [elements]);

  const updateElementPosition = (index, newPosition) => {
    const updatedElements = [...elementsState];
    updatedElements[index] = {
      ...updatedElements[index],
      props: {
        ...updatedElements[index].props,
        position: newPosition
      }
    };
    updateElements(updatedElements);
    setElementsState(updatedElements);
  };

  if (elements == null || format == null) {
    return (
      <>
        <div 
          className='bg-white aspect-[16/9] max-w-full min-w-[250px] max-h-[800px] m-10'>
        </div>
      </>
    );
  }

  const Textboxes = elements.filter(element => element.props.text);
  const Images = elements.filter(element => element.props.image);
  const Videos = elements.filter(element => element.props.autoplay);
  const Codes = elements.filter(element => element.props.code);

  return (
    <>
      <div 
        className='aspect-[16/9] max-w-full min-w-[250px] max-h-[800px] m-10'
        style={{...slideFormat,}}
      >
        {Textboxes.map((textbox, index) => (
          <Textbox 
            key={index} 
            {...textbox.props} 
            updatePosition={(newPosition) => updateElementPosition(index, newPosition)}  
          />
        ))}
        {Images.map((image, index) => (
          <Image
            key={index}
            {...image.props}
            // updatePosition={(newPosition) => updateElementPosition(index, newPosition)}  
          />
        ))}
        {Videos.map((video, index) => (
          <Video
            key={index}
            {...video.props}
            // updatePosition={(newPosition) => updateElementPosition(index, newPosition)}  
          />
          
        ))}
        {Codes.map((code, index) => (
          <Code
            key={index}
            {...code.props}
            // updatePosition={(newPosition) => updateElementPosition(index, newPosition)}
          />
        ))}
      </div>
    </>
    
  );
  
};

export default Slide;