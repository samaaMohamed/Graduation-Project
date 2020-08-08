import React, { Component } from "react";
import book1_photo from "assets/book.jpeg";
import BooksSection from "./../booksSection";

export default class LatestAddedBooks extends Component {
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
        <BooksSection title="Latest Added Books" books={this.state.books} />
      </div>
    );
  }
}
