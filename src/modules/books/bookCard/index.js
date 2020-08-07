import React, { Component } from "react";
import {
  book_card,
  book_card_heading,
  book_card_rate_icon,
} from "./style.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
export default class BookCard extends Component {
  render() {
    let { book } = this.props;
    return (
      <div className={book_card}>
        <Link to={`/books/${book.id}`}>
          <img src={book.cover} />
        </Link>
        <h3 className={book_card_heading}>{book.title}</h3>
        <p>{book.auther}</p>
        <p>{book.price}</p>
        <FontAwesomeIcon
          className={book_card_rate_icon}
          icon={faStar}
        ></FontAwesomeIcon>
        <span>{book.rate}</span>
      </div>
    );
  }
}
