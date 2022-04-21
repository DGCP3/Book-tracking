import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAll, update } from "../BooksAPI";
import Book from "../components/Book";
import Header from "../components/Header";
import Shelf from "../components/Shelf";

const Home = () => {
  const [books, setBooks] = useState(null);

  async function getAllBooks() {
    const books = await getAll();
    const groupByShelf = books?.reduce((acc, book) => {
      acc[book.shelf] = acc[book.shelf] || [];
      acc[book.shelf].push(book);
      return acc;
    }, {});
    setBooks(groupByShelf);
  }

  function changeShelf(book, shelf) {
    update(book, shelf).then(() => {
      getAllBooks();
    });
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      <Header title={"MyReads"} />
      <div className="list-books-content">
        {books &&
          Object.keys(books)?.map((shelf) => {
            return (
              <Shelf ShelfName={shelf} key={shelf}>
                {books[shelf]?.map((book) => (
                  <Book key={book.id} {...{ book, changeShelf }} />
                ))}
              </Shelf>
            );
          })}
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
