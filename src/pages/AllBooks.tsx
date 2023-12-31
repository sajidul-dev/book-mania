import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/books").then((res) => {
      setBooks(res.data.data);
    });
  }, []);

  console.log(books);

  books.map((book) => {
    console.log(book);
  });
  return (
    <div className="w-[90%] mx-auto">
      <h1>hello</h1>
      <div className="grid grid-cols-3 gap-4">
        {books?.length > 0 &&
          books.map((book) => <BookCard key={book._id} book={book} />)}
      </div>
    </div>
  );
};

export default AllBooks;
