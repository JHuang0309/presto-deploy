import Textbox from '../components/Textbox';

const Slide = ({ elements, format }) => {
  // console.log(elements);
  // console.log(format);
  
  

  if (elements == null || format == null) {
    return (
      <>
        <div className='bg-white aspect-[16/9] max-w-full min-w-[250px] max-h-[800px] m-10'>
        </div>
      </>
    );
  }

  const Textboxes = elements.filter(element => element.props.text);

  return (
    <>
      <div className='bg-white aspect-[16/9] max-w-full min-w-[250px] max-h-[800px] m-10'>
      {/* {JSON.stringify(Textboxes)} */}
      {Textboxes.map((textbox, index) => (
          <Textbox key={index} {...textbox.props} />
        ))}
      </div>
    </>
    
  );
  
};

export default Slide;