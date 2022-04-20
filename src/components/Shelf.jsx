import React from "react";

const Shelf = ({ ShelfName, children }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ShelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{children}</ol>
      </div>
    </div>
  );
};

export default Shelf;
