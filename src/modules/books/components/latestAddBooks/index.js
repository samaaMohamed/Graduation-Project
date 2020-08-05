import React, { Component } from "react";
import book1_photo from "assets/intro.jpg";
import BooksSection from "./../booksSection/index";

export default class LatestAddedBooks extends Component {
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
        <BooksSection title="Latest Added Books" books={this.state.books} />
      </div>
    );
  }
}
