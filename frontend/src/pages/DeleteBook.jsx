import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackNavigaion from "../components/BackNavigaion";

const DeleteBook = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <div className="p-4">
      <BackNavigaion />
      <h1 className="text-2xl font-bold w-full text-center">Delete Book</h1>
      {loading ? (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="text-red-500 font-bold">
            Are you sure you want to delete this book?
          </p>
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-4">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
