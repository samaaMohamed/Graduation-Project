import React, { Component } from "react";
import {
  book_card,
  book_card_heading,
  book_card_rate_icon,
  book_old_price,
  add_btn,
  cart_icon,
} from "./style.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
export default class BookCard extends Component {
  render() {
    let { book } = this.props;
    return (
      <div className={book_card}>
        <Link to={`/books/${book.id}`}>
          <img src={book.cover} />
        </Link>
        <Link to={`/books/${book.id}`}>
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
