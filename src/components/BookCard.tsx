import React from "react";

const BookCard = ({ book }) => {
  console.log("hello", book);
  return (
    <div className="border border-black flex items-center">
      <div className="w-[200px] h-[300px] flex items-center  p-2">
        <img className="w-[100%]" src={book.image} alt="" />
      </div>
      <div className="p-3">
        <div className="flex flex-col">
          <h1>{book.title}</h1>
          <span>Autor: {book.author}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
