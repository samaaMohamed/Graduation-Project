import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export default function SearchBar({ type }) {
  let history = useHistory();
  const [name, setName] = useState("");

  let returnBarTypeClass = (() => {
    if (type === "header") {
      return "header_bar";
    } else if (type === "booklist") {
      return "booklist_bar";
    } else if (type === "intro") {
      return "intro_bar";
    }
  })();

  let timeout = null;
  let handleChange = (e) => {
    setName(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => searchByName(), 4000);
  };

  let searchByName = (e) => {
    if (e) e.preventDefault();
    history.push(`/books?q=${name}`);
  };

  return (
    <>
      <form onSubmit={searchByName}>
        <section className={`search_bar_container ${returnBarTypeClass}`}>
          <input
            className="search_bar"
            name="search"
            type="text"
            placeholder="search"
            onChange={handleChange}
            value={name}
          />
          <span className="search_icon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </section>
      </form>
    </>
  );
}
