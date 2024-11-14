import { useState, useEffect } from 'react';
import Textbox from '../components/Textbox';
import Image from '../components/Image';
import Video from '../components/Video';
import Code from '../components/Code';

const Slide = ({ elements, format, updateElements }) => {
  // console.log(elements);
  // console.log(format);

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
        <div className='bg-white aspect-[16/9] max-w-full min-w-[250px] max-h-[800px] m-10'>
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
      <div className='bg-white aspect-[16/9] max-w-full min-w-[250px] max-h-[800px] m-10'>
      {/* {JSON.stringify(Textboxes)} */}
      {Textboxes.map((textbox, index) => (
          <Textbox 
            key={index} 
            {...textbox.props} 
            updatePosition={(newPosition) => updateElementPosition(index, newPosition)}  
          />
        ))}
      {/* {JSON.stringify(Images)} */}
      {Images.map((image, index) => (
          <Image key={index} {...image.props} />
        ))}
      {Videos.map((video, index) => (
          <Video key={index} {...video.props} />
        ))}
      {Codes.map((code, index) => (
          <Code key={index} {...code.props} />
        ))}
      </div>
    </>
    
  );
  
};

export default Slide;