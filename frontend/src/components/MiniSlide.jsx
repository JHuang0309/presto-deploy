import { useEffect, useState } from 'react';
const MiniSlide = ({ format, slideNumber }) => {
  const [slideFormat, setSlideFormat] = useState({});

  useEffect(() => {
    const jsxFormat = {}
    if (format.format === "solid") {
      jsxFormat.backgroundColor = format.colour;
    } else if (format.format === "gradient") {
      const gradientDirection = 
        format.gradientDirection === "left-right" ? "to right" :
        format.gradientDirection === "top-bottom" ? "to bottom" : "to right";
      jsxFormat.background = `linear-gradient(${gradientDirection}, ${format.startColour}, ${format.endColour})`;
    } else if (format.format === "image") {
      jsxFormat.backgroundImage = `url(${format.image})`;
      jsxFormat.backgroundSize = "cover";
      jsxFormat.backgroundPosition = "center";
    }
    setSlideFormat(jsxFormat);
  }, []);

  return (
    <div
      className="relative bg-light-gray border border-gray-300"
      style={{
        height: "70px",
        width: "124px",
        paddingTop: "56.25%",
        ...slideFormat,
      }}
    >
      <div className="absolute bottom-0 right-0 mb-2 mr-2">
        <span className="text-grey font-semibold">{slideNumber}</span>
      </div>
    </div>
  );
}
export default MiniSlide;