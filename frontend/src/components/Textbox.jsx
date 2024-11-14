const Textbox = ({ width, height, text, size, colour }) => {
  return (
    <div className={`w-${width} h-${height} text-[${colour}] text-${size}xl border border-gray-100 m-5`}>
      {width}, {height}, {text}, {size}, {colour}
    </div>
  );
};

export default Textbox;