import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "../components/Book";

function SearchPage() {
  const input = useRef();
  const [result, setResult] = useState(null);
  function searchBook() {
    let timeout;
    return () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        search(input.current.value, 5).then((books) => {
          if ("error" in books) {
            setResult([]);
          } else {
            setResult([...books]);
          }
        });
      }, 3000);
    };
  }
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
                result?.map((book) => <Book book={book} key={book.id} />)
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
