import React, { Component } from "react";
import BooksSection from "./../booksSection";
import book1_photo from "assets/book.jpeg";

export default class BestReviewedBooks extends Component {
  state = {
    books: [
      { id: 1, cover: book1_photo, price: 200, currency: "L.E", rate: 5 },
      { id: 2, cover: book1_photo, price: 200, currency: "L.E", rate: 5 },
      { id: 3, cover: book1_photo, price: 200, currency: "L.E", rate: 5 },
      { id: 4, cover: book1_photo, price: 200, currency: "L.E", rate: 5 },
      { id: 5, cover: book1_photo, price: 200, currency: "L.E", rate: 5 },
      { id: 6, cover: book1_photo, price: 200, currency: "L.E", rate: 5 },
    ],
  };
  render() {
    return (
      <div>
        <BooksSection title="Best Reviewed Books" books={this.state.books} />
      </div>
    );
  }
}
