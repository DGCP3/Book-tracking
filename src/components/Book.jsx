function Book({ book, changeShelf, shelf }) {
  const { imageLinks, title, authors } = book;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks?.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => changeShelf(book, e.target.value)}
              defaultValue={book?.shelf || "none"}
            >
              <option value="disabled" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors && authors.join(", ")}</div>
      </div>
    </li>
  );
}
export default Book;
