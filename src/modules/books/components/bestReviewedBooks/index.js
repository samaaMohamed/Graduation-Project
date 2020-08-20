import React, { Component } from "react";
import BooksSection from "./../booksSection";
import BookService from "modules/books/services/book.service";
import Loading from "shared/loading";

export default class BestReviewedBooks extends Component {
  _bookService;
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
    let { books } = await this._bookService.listBestReviewed();
    this.setState({ books, isLoading: false });
  }

  render() {
    let { books, isLoading } = this.state;
    return (
      <>
        <Loading isLoading={isLoading} />
        <BooksSection title="Best Reviewed Books" books={books} />
      </>
    );
  }
}
