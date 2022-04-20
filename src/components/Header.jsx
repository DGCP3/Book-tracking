import React from "react";
import { Link } from "react-router-dom";

function Header({ title }) {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
