import React, { Component } from "react";
import BooksSection from "./../booksSection";
import book1_photo from "assets/intro.jpg";

export default class BestReviewedBooks extends Component {
  state = {
    books: [
      { id: 1, cover: book1_photo },
      { id: 2, cover: book1_photo },
      { id: 3, cover: book1_photo },
      { id: 4, cover: book1_photo },
      { id: 5, cover: book1_photo },
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
