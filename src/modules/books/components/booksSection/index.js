import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  books_section,
  books_section_img,
  books_section_title,
  book_list,
} from "./style.module.css";

export default class BooksSection extends Component {
  render() {
    let { title, books } = this.props;
    return (
      <div className={books_section}>
        <h2 className={books_section_title}>{title}</h2>
        <section className={book_list}>
          {books.map((book) => {
            return (
              <Link to={`/books/${book.id}`}>
                <img className={books_section_img} src={book.cover} alt="" />
              </Link>
            );
          })}
        </section>
      </div>
    );
  }
}
