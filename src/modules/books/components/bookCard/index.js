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
import { CartProvider } from "globals/contexts/cart.context";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default class BookCard extends Component {
  static contextType = CartProvider;
  state = {
    addedToCart: false,
    unAuth: false,
  };

  addToCart = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.setState({ unAuth: true });
      return;
    }
    let order = this.generateOrderObject();
    this.context.addOrder(order);
    this.setState({ addedToCart: true });
  };

  generateOrderObject = () => {
    let {
      book: { name, price, currency, _id },
    } = this.props;
    return {
      bookName: name,
      bookId: _id,
      price,
      currency,
      quantity: 1,
      status: "ongoing",
    };
  };

  render() {
    let { book } = this.props;
    let { addedToCart, unAuth } = this.state;
    return (
      <div className={book_card}>
        <Link to={`/books/${book._id}`}>
          <img src={book.cover} alt={`${book.name} cover`} />
        </Link>
        {/* <Link to={`/books/${book._id}`}>
          <h3 className={book_card_heading}>
            {book.name.split("").slice(0, 15).join(" ")}...
          </h3>
        </Link> */}
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
        <button
          className={add_btn}
          disabled={book.inCart || addedToCart}
          onClick={this.addToCart}
        >
          {!book.inCart && !addedToCart ? (
            <>
              <FontAwesomeIcon
                className={cart_icon}
                icon={faShoppingCart}
              ></FontAwesomeIcon>
              <span>add to cart</span>
            </>
          ) : (
            <span>Added To Cart</span>
          )}
        </button>
        <Modal
          open={unAuth}
          onClose={() => {
            this.setState({ unAuth: false });
          }}
          center
          styles={{
            modal: {
              animation: `${
                unAuth ? "customEnterAnimation" : "customLeaveAnimation"
              } 500ms`,
            },
          }}
        >
          <p className="h2 text-center">
            Please <Link to={`/login?returnUrl=/books`}>login</Link> first or{" "}
            <Link to="/register">create an account</Link>
          </p>
        </Modal>
      </div>
    );
  }
}
