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
        const result = await search(input.current.value, 5);
        if (result.error) {
          setResult([]);
          return;
        }
        let filtered = userBooks.filter((book) =>
          result?.some((r) => r.id === book.id)
        );
        setResult(Object.assign(result, filtered));
      }, 3000);
    };
  }
  function changeShelf(book, shelf) {
    update(book, shelf).then(() => {
      getAll().then((books) => setUserBook(books));
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
