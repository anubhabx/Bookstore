import React from "react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const BackNavigaion = ({ destination = "/" }) => {
  return (
    <div className="w-full flex justify-start p-2">
      <Link to={destination}>
        <MdArrowBack />
      </Link>
    </div>
  );
};

export default BackNavigaion;
