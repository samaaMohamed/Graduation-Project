import React, { Component } from "react";
import BookCard from "modules/books/components/bookCard";
import {
  book_list,
  book_list_category,
  add_btn,
  cart_icon,
} from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import BookService from "modules/books/services/book.service";
import CategoryService from "modules/books/services/category.service";
import queryStr from "query-string";

export default class BookList extends Component {
  _bookService;
  _categoryService;
  filterQuery;
  searchQuery;

  state = {
    books: [],
    categories: [],
    isLoading: false,
  };

  constructor(props) {
    super(props);
    this._bookService = new BookService();
    this._categoryService = new CategoryService();
  }

  setQueryUrlParams() {
    this.queryString = queryStr.parse(this.props.location.search);
    this.filterQuery = this.queryString.category;
    this.searchQuery = this.queryString.q;
  }

  async componentDidMount() {
    this.setQueryUrlParams();
    if (this.filterQuery) {
      return this.filterBooks(this.filterQuery);
    } else if (this.searchQuery) {
      return this.searchOnLoad();
    } else {
      this.setState({ isLoading: true });
      let { books } = await this._bookService.list();
      this.setState({ books, isLoading: false });
    }

    let categories = await this._categoryService.list();
    this.setState({ categories });
  }

  async searchOnLoad() {
    this.setState({ isLoading: true });
    let books = await this._bookService.search(this.searchQuery);
    this.setState({ books, isLoading: false });
  }

  async filterBooks(categoryId) {
    this.setState({ isLoading: true });
    let books = await this._bookService.filterByCategory(categoryId);
    this.setState({ books, isLoading: false });

    if (!this.filterQuery) {
      this.updateUrlWithCategoryId(categoryId);
    }
  }

  updateUrlWithCategoryId(categoryId) {
    this.queryString.category = categoryId;
    let filterStringified = this.queryString.stringify(
      this.queryString.category
    );
    this.props.location.search = filterStringified;
  }

  render() {
    let { isLoading, categories, books } = this.state;
    return (
      <div className={book_list}>
        <div className="container">
          {isLoading && <p className="text-center">Loading ...</p>}
          <section className={book_list_category}>
            {categories &&
              categories.map((category) => {
                return (
                  <button
                    key={category._id}
                    onClick={() => this.filterBooks(category._id)}
                  >
                    {category.name}
                  </button>
                );
              })}
          </section>
          <div className="row">
            {books &&
              books.map((book) => {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <BookCard book={book} />
                    <button className={add_btn}>
                      <FontAwesomeIcon
                        className={cart_icon}
                        icon={faShoppingCart}
                      ></FontAwesomeIcon>
                      add to cart
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
