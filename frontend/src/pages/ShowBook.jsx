import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackNavigaion from "../components/BackNavigaion";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        // console.log(response.data);
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold w-full text-center">
        <BackNavigaion />
        Book Details
      </h1>
      {loading ? (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-bold">Title: </span>
              {book.title}
            </div>
            <div>
              <span className="font-bold">Author: </span>
              {book.author}
            </div>
            <div>
              <span className="font-bold">Publish Year: </span>
              {book.publishYear}
            </div>
            <div>
              <span className="font-bold">Created At: </span>
              {new Date(book.createdAt).toTimeString()}
            </div>
            <div>
              <span className="font-bold">Updated At: </span>
              {new Date(book.updatedAt).toTimeString()}
            </div>
            {/* Operations */}
          </div>
          <div className="flex flex-col gap-5">
            <div className="rounded-lg bg-blue-500 p-4">
              <Link to={`/books/edit/${book._id}`}>
                <MdOutlineEdit size="2em" color="white" title="Edit" />
              </Link>
            </div>
            <div className="rounded-lg bg-red-500 p-4">
              <Link to={`/books/delete/${book._id}`}>
                <MdOutlineDelete size="2em" color="white" title="Delete" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
