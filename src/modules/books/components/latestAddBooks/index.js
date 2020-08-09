import React, { Component } from "react";
import BooksSection from "./../booksSection";
import BookService from "modules/books/services/book.service";

export default class LatestAddedBooks extends Component {
  state = {
    books: [],
    isLoading: false,
  };

  constructor(props) {
    super(props);
    this._bookService = new BookService();
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    let books = await this._bookService.listLatestAdded();
    this.setState({ books, isLoading: false });
  }

  render() {
    let { books, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <BooksSection title="Latest Added Books" books={books} />
        )}
      </>
    );
  }
}
