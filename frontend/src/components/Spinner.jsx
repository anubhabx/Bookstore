import React from "react";

const Spinner = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <span className="animate-ping w-16 h-16 m-8 rounded-full bg-sky-600"></span>
    </div>
  );
};

export default Spinner;
