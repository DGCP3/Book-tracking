import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAll, search, update } from "../BooksAPI";
import Book from "../components/Book";

function SearchPage() {
  const input = useRef();
  const [userBooks, setUserBook] = useState(null);
  const [result, setResult] = useState(null);

  function searchBook() {
    let timeout;
    return () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(async () => {
        let result = await search(input.current.value);
        if (result.error) {
          setResult([]);
          return;
        }
        result.map((book) => {
          let b = userBooks.find((b) => b.id === book.id);
          if (b) book.shelf = b.shelf;
        });
        setResult(result);
      }, 3000);
    };
  }
  function changeShelf(book, shelf) {
    update(book, shelf).then(() => {
      getAll().then(setUserBook);
    });
  }
  useEffect(() => {
    getAll().then((books) => setUserBook(books));
  }, []);

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={"/"}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              ref={input}
              onChange={searchBook()}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {result &&
              (result.length !== 0 ? (
                result?.map((book) => (
                  <Book key={book.id} {...{ book, changeShelf }} />
                ))
              ) : (
                <h1>Not found</h1>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
