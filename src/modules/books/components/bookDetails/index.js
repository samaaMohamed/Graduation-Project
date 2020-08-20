import React, { Component } from "react";
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
import { CartProvider } from "globals/contexts/cart.context";
import Loading from "shared/loading";

export default class BookDetails extends Component {
  static contextType = CartProvider;
  state = {
    book: null,
    isModalOpened: false,
    isSubmitting: false,
    reviewBody: "",
    reviewRate: 1,
    addedToCart: false,
  };

  constructor(props) {
    super(props);
    this._bookService = new BookService();
  }

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
    } = this.state;
    return {
      bookName: name,
      bookId: _id,
      price,
      currency,
      quantity: 1,
      status: "ongoing",
    };
  };

  async componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      isLoading: true,
      book: null,
      isModalOpened: false,
      isSubmitting: false,
      reviewBody: "",
      reviewRate: 1,
      isAuthenticated: !!user,
      user: {
        name: user && user.name,
        id: user && user._id,
      },
    });
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
      addedToCart,
      isAuthenticated,
    } = this.state;
    return (
      <div className={book_details}>
        <div className="container">
          <Loading isLoading={isLoading} />
          {!!errMsg && <p className="text-center">{errMsg}</p>}
          {book && (
            <>
              <div className="row">
                <div className="col-lg-4 col-md-6 co-sm-12">
                  <img
                    className={book_image}
                    src={book.cover}
                    alt="the cover of the book"
                  />
                </div>
                <div className="col-lg-8 col-md-6 co-sm-12">
                  <h1>{this.state.book.name}</h1>
                  <Link to={`/author/${book.author._id}`}>
                    <span className={author}>{book.author.name}</span>
                  </Link>
                  <span>(author)</span>
                  <p className={book_price}>
                    <span className={old_price}>
                      {book.currency} {book.old_price}
                    </span>
                    <span className={new_price}>
                      {book.currency} {book.price}
                    </span>
                    <FontAwesomeIcon
                      className={icon}
                      icon={faStar}
                    ></FontAwesomeIcon>
                    <span className={rate}>{book.rate}</span>
                  </p>
                  {isAuthenticated && (
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
                  )}
                  <h3>Description</h3>
                  <p className={description}>{book.description}</p>
                </div>
              </div>
              <section className={book__reviews}>
                <section className={add_review_section}>
                  <button
                    className={review__btn}
                    onClick={this.toggleModalState}
                  >
                    Add Review
                  </button>
                </section>
              </section>
              <section className={book__reviews__list}>
                {book.reviews.length > 0 && (
                  <h2>Reviews ({book.reviews.length})</h2>
                )}
                <ul className="list-unstyled">
                  {book.reviews.length > 0 &&
                    book.reviews.map((review) => (
                      <li className="border-bottom p-4" key={review._id}>
                        <h3 className="d-flex justify-content-between mb-2">
                          <p>{review.author.name}</p>
                          <small>
                            <FontAwesomeIcon
                              className={icon}
                              icon={faStar}
                            ></FontAwesomeIcon>
                            {review.rate}
                          </small>
                        </h3>
                        <p>{review.body}</p>
                      </li>
                    ))}
                </ul>
              </section>
              <Modal
                open={isModalOpened}
                onClose={this.toggleModalState}
                center
                styles={{
                  modal: {
                    animation: `${
                      isModalOpened
                        ? "customEnterAnimation"
                        : "customLeaveAnimation"
                    } 500ms`,
                  },
                }}
              >
                {isAuthenticated ? (
                  <>
                    <h2>Add a useful review</h2>
                    <form onSubmit={this.sendReview}>
                      <section className="form-group">
                        <label htmlFor="rate">Your rate from 1 to 5</label>
                        <input
                          className="form-control"
                          type="range"
                          name="reviewRate"
                          id="rate"
                          min="1"
                          max="5"
                          step="1"
                          value={reviewRate}
                          onChange={this.handleReviewChange}
                        />
                        <small>
                          Rate: {reviewRate} - {this.returnRateMessage()}
                        </small>
                      </section>
                      <section className="form-group">
                        <label htmlFor="rateBody">Your Review</label>
                        <textarea
                          type="text"
                          id="rateBody"
                          className="form-control"
                          name="reviewBody"
                          value={reviewBody}
                          onChange={this.handleReviewChange}
                          rows="5"
                        ></textarea>
                      </section>
                      <section className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Submitting your review ..."
                            : "Submit"}
                        </button>
                      </section>
                    </form>
                  </>
                ) : (
                  <p className="h2 text-center">
                    Please{" "}
                    <Link to={`/login?returnUrl=/books/${book._id}`}>
                      login
                    </Link>{" "}
                    first or <Link to="/register">create an account</Link>
                  </p>
                )}
              </Modal>
            </>
          )}
        </div>
      </div>
    );
  }
}
