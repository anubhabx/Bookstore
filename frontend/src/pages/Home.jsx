import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineAddBox,
  MdOutlineInfo,
  MdOutlineDelete,
  MdOutlineEdit,
} from "react-icons/md";
import Spinner from "../components/Spinner";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Books</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-2xl text-blue-500" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="text-left">Title</th>
              <th className="text-left">Author</th>
              <th className="text-left max-md:hidden">Publish Year</th>
              <th className="text-left max">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td className="max-md:hidden">{book.publishYear}</td>
                  <td>
                    <div className="flex gap-2">
                      <div className="rounded-lg bg-green-500 p-2">
                        <Link to={`/books/details/${book._id}`}>
                          <MdOutlineInfo color="white" />
                        </Link>
                      </div>
                      <div className="rounded-lg bg-blue-500 p-2">
                        <Link to={`/books/edit/${book._id}`}>
                          <MdOutlineEdit color="white" />
                        </Link>
                      </div>
                      <div className="rounded-lg bg-red-500 p-2">
                        <Link to={`/books/delete/${book._id}`}>
                          <MdOutlineDelete color="white" />
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
