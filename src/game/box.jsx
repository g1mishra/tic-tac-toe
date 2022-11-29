import React from "react";

const Box = ({ value, onClick }) => {
  return (
    <div onClick={onClick} className="w-24 h-24 bg-gray-800 flex justify-center items-center text-white">
      {value}
    </div>
  );
};

export default Box;
