import React, { Component } from "react";
import book_photo from "assets/book.jpeg";
import {
  book_details,
  book_image,
  author,
  book_price,
  old_price,
  new_price,
  rate,
  description,
  icon,
  add_btn,
  cart_icon,
  book__reviews,
  add_review_section,
  review__btn,
  book__reviews__list,
} from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import BookService from "modules/books/services/book.service";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default class BookDetails extends Component {
  state = {
    book: null,
    isModalOpened: false,
    isSubmitting: false,
    reviewBody: "",
    reviewRate: 1,
    user: {
      name: "Samaa",
      id: "1",
    },
  };

  constructor(props) {
    super(props);
    this._bookService = new BookService();
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.bookId = this.props.match.params.id;
    try {
      let book = await this._bookService.getBookDetails(this.bookId);
      this.setState({ book, isLoading: false });
    } catch (error) {
      if (error.response) this.setState({ errMsg: error.response.data.msg });
    }
  }

  toggleModalState = () => {
    let { isModalOpened } = this.state;
    this.setState({ isModalOpened: !isModalOpened });
  };

  handleReviewChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  addReviewToTheList = () => {
    let {
      book: { reviews },
      reviewBody,
      reviewRate,
      user: { id, name },
    } = this.state;
    reviews.push({
      body: reviewBody,
      rate: reviewRate,
      author: { id, name },
    });
  };

  sendReview = async (e) => {
    e.preventDefault();
    let {
        reviewBody,
        reviewRate,
        user: { id, name },
      } = this.state,
      reviewObj = {
        rate: reviewRate,
        body: reviewBody,
        author: { id, name },
      };

    this.setState({ isSubmitting: true });
    try {
      let successMessage = await this._bookService.addReview(
        this.bookId,
        reviewObj
      );
      alert(successMessage);
      this.setState({ isSubmitting: false });
      this.addReviewToTheList();
      this.toggleModalState();
    } catch (error) {
      if (error.response) {
        this.setState({ isSubmitting: false });
        alert(error.response.data.msg);
      }
    }
  };

  returnRateMessage = () => {
    let { reviewRate } = this.state;
    let rateMessages = ["", "Very Bad", "Bad", "Normal", "Good", "Attractive"];
    return rateMessages[reviewRate];
  };

  render() {
    let {
      book,
      isLoading,
      errMsg,
      isModalOpened,
      reviewBody,
      reviewRate,
      isSubmitting,
    } = this.state;
    return (
      <div className={book_details}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 co-sm-12">
              <img
                className={book_image}
                src={this.state.book.cover}
                alt="book photo"
              />
            </div>
            <div className="col-lg-8 col-md-6 co-sm-12">
              <h2>{this.state.book.name}</h2>
              <Link to="/author/:id">
                <span className={author}>{this.state.book.author}</span>
              </Link>
              <span>(author)</span>
              <p className={book_price}>
                <span className={old_price}>{this.state.book.old_price}</span>
                <span className={new_price}>{this.state.book.price}</span>
                <FontAwesomeIcon
                  className={icon}
                  icon={faStar}
                ></FontAwesomeIcon>
                <span className={rate}>{this.state.book.rate}</span>
              </p>
              <button className={add_btn}>
                <FontAwesomeIcon
                  className={cart_icon}
                  icon={faShoppingCart}
                ></FontAwesomeIcon>
                add to cart
              </button>
              <h3>Description</h3>
              <p className={description}>{this.state.book.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
