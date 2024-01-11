import axios from "axios";
import React, { useEffect, useState } from "react";
import BackNavigaion from "../components/BackNavigaion";
import { useNavigate } from "react-router";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    event.preventDefault();
    const bookData = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    axios
      .post(`http://localhost:5555/books`, bookData)
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="p-4">
      <BackNavigaion />
      <h1 className="w-full text-center font-bold text-2xl mb-4">
        Create Book
      </h1>
      <div className="flex items-center justify-center">
        <form>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full">
              <label htmlFor="title" className="mr-5">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter title"
                className="border border-gray-400 p-2 rounded-md"
                onChange={(event) => {
                  setTitle(event.target.value);
                  console.log(title);
                }}
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
                placeholder="Enter author"
                className="border border-gray-400 p-2 rounded-md"
                onChange={(event) => {
                  setAuthor(event.target.value);
                  console.log(author);
                }}
              />
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="publishYear" className="mr-5">
                Publish Year
              </label>
              <input
                type="number"
                name="publishYear"
                id="publishYear"
                placeholder="Enter publish year"
                className="border border-gray-400 p-2 rounded-md"
                onChange={(event) => {
                  setPublishYear(event.target.value);
                  console.log(publishYear);
                }}
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-full" onClick={handleSubmit}>
            Create Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
