import React, { useState, useEffect } from "react";
import BackNavigaion from "../components/BackNavigaion";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
        setSuccess(true);
        navigate("/");
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
        setSuccess(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data.entries());
    axios
      .put(`http://localhost:5555/books/${id}`, payload)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackNavigaion />
      <h1 className="text-center w-full mb-4 font-bold text-2xl">Edit Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between w-full">
                <label htmlFor="title" className="mr-5">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={book.title}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-between w-full">
                <label htmlFor="author" className="mr-5">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  defaultValue={book.author}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-between w-full">
                <label htmlFor="publishYear" className="mr-5">
                  Publish Year
                </label>
                <input
                  type="text"
                  name="publishYear"
                  id="publishYear"
                  defaultValue={book.publishYear}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-center items-center w-full">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBook;
