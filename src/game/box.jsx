import React from "react";

const Box = ({ value, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className={`w-full h-24 bg-gray-800 hover:bg-gray-700 transition-colors 
        flex justify-center items-center text-4xl font-bold rounded-lg
        ${value === 'X' ? 'text-blue-400' : 'text-red-400'}
        ${!value ? 'hover:bg-gray-700' : 'cursor-not-allowed'}`}
    >
      {value}
    </button>
  );
};

export default Box;
