import React from "react";

function Header({ title }) {
  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
