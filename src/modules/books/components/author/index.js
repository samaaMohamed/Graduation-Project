import React, { Component } from "react";
import BookCard from "../bookCard";
import { book_list } from "./style.module.css";
import AuthorService from "modules/books/services/author.service";

export default class Author extends Component {
  state = {
    books: [],
  };

  constructor(props) {
    super(props);
    this._authorService = new AuthorService();
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      let authorId = this.props.match.params.id,
        { books } = await this._authorService.listAuthorBooks(authorId);
      this.setState({ books, isLoading: false });
    } catch (error) {
      if (error.response) this.setState({ errMsg: error.response.data.msg });
    }
  }

  render() {
    let { books, isLoading, errMsg } = this.state;
    return (
      <div className={book_list}>
        <div className="container">
          {isLoading && <p className="text-center">Loading ...</p>}
          {!!errMsg && <p className="text-center">{errMsg}</p>}
          {!isLoading && !errMsg && books.length > 0 && (
            <>
              <h2>{books[0].author.name}'s Books</h2>
              <div className="row justify-content-center">
                {books &&
                  books.map((book) => {
                    return (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6"
                        key={book._id}
                      >
                        <BookCard book={book} />
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
