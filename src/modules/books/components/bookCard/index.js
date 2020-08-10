import React, { Component } from "react";
import {
  book_card,
  book_card_heading,
  book_card_rate_icon,
  book_old_price,
  book_rate,
  add_btn,
  cart_icon,
} from "./style.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";

export default class BookCard extends Component {
  render() {
    let { book } = this.props;
    return (
      <div className={book_card}>
        <Link to={`/books/${book._id}`}>
          <img src={book.cover} alt={`${book.name} cover`} />
        </Link>
        <Link to={`/books/${book._id}`}>
          <h3 className={book_card_heading}>{book.name}</h3>
        </Link>
        <p>{book.author.name}</p>
        <div className="d-flex justify-content-between">
          <p className={book_rate}>
            <span className="mr-1">{book.currency}</span>
            {book.old_price && (
              <span className={`${book_old_price} mr-1`}>{book.old_price}</span>
            )}
            <span>{book.price}</span>
          </p>
          <p>
            <FontAwesomeIcon
              className={book_card_rate_icon}
              icon={faStar}
            ></FontAwesomeIcon>
            <span>{book.rate}</span>
          </p>
        </div>
        <button className={add_btn}>
          <FontAwesomeIcon
            className={cart_icon}
            icon={faShoppingCart}
          ></FontAwesomeIcon>
          add to cart
        </button>
      </div>
    );
  }
}
