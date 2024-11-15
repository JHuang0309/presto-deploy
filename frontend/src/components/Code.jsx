import { Rnd } from 'react-rnd';

const Code = ({ width, height, code, size }) => {
  return (
    <Rnd>
      <div className={`w-${width} h-${height} text-${size}xl m-5 bg-black text-pink-100 grid place-items-center p-5`}>
        <code>{code}</code>
      </div>
    </Rnd>
  );
};

export default Code;
