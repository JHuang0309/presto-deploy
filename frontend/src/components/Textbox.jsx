const Textbox = ({ width, height, text, size, colour }) => {
  return (
    <div className={`w-${width} h-${height} text-${size}xl border border-gray-100 m-5`}>
      <p style={{color:`${colour}`}}>{width}, {height}, {text}, {size}, {colour}</p>
    </div>
  );
};

export default Textbox;
