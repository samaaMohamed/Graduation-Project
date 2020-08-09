import React, { Component } from "react";
import {
  book_card,
  book_card_heading,
  book_card_rate_icon,
  book_old_price,
} from "./style.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default class BookCard extends Component {
  render() {
    let { book } = this.props;
    return (
      <div className={book_card}>
        <Link to={`/books/${book._id}`}>
          <img src={book.cover} alt={`${book.name} cover`} />
        </Link>
        <Link to={`/books/${book._id}`}>
          <h3 className={book_card_heading}>{book.title}</h3>
        </Link>
        <p>{book.auther}</p>
        <p className={book_old_price}>{book.old_price}</p>
        <span>{book.price}</span>
        <FontAwesomeIcon
          className={book_card_rate_icon}
          icon={faStar}
        ></FontAwesomeIcon>
        <span>{book.rate}</span>
      </div>
    );
  }
}
