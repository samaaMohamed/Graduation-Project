import React, { Component } from "react";
import BookCard from "modules/books/components/bookCard";
import {
  book_list,
  book_list_category,
  active,
  category_btn,
  back_btn,
  booklist_bar,
} from "./style.module.css";
import BookService from "modules/books/services/book.service";
import CategoryService from "modules/books/services/category.service";
import queryStr from "query-string";
import Pagination from "shared/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "shared/searchBar";

export default class BookList extends Component {
  _bookService;
  _categoryService;
  filterQuery;
  searchQuery;
  state = {
    books: [],
    Categories: [],
    isLoading: false,
    isFailed: false,
    totalPages: 0,
    currentPage: 0,
  };

  constructor(props) {
    super(props);
    this._bookService = new BookService();
    this._categoryService = new CategoryService();
  }

  getQueryUrlParams() {
    this.queryString = queryStr.parse(this.props.location.search);
    this.filterQuery = this.queryString.category;
    this.searchQuery = this.queryString.q;
    this.page = this.queryString.page;
  }

  setUrlWitQueryParams() {
    let queryParams = queryStr.stringify(this.queryString);
    let newUrl =
      window.location.origin + window.location.pathname + `?${queryParams}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }

  setSpecificQueryParam(queryName, value) {
    this.queryString[queryName] = value;
    this.setUrlWitQueryParams();
  }

  updateUrlWithPageOfBookList = (page = this.queryString["page"] || 1) => {
    if (
      !this.queryString["page"] ||
      (this.queryString["page"] && page != this.queryString["page"])
    ) {
      this.setSpecificQueryParam("page", page);
      window.location.reload();
    }
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    let categories = await this._categoryService.list();
    this.setState({ categories });
    this.getQueryUrlParams();
    this.updateUrlWithPageOfBookList();
    if (this.filterQuery) {
      return this.filterBooks(this.filterQuery);
    } else if (this.searchQuery) {
      return this.searchOnLoad();
    } else {
      this.setState({ isLoading: true });
      try {
        let { books, currentPage, totalPages } = await this._bookService.list(
          this.page
        );
        this.setState({ books, isLoading: false, currentPage, totalPages });
      } catch (error) {
        if (error.response)
          this.setState({
            isLoading: false,
            isFailed: error.response.data.msg,
          });
      }
    }
  }

  async searchOnLoad() {
    this.setState({ isLoading: true });
    try {
      let { books, currentPage, totalPages } = await this._bookService.search(
        this.searchQuery
      );
      this.setState({ books, isLoading: false, currentPage, totalPages });
    } catch (error) {
      this.setState({ isLoading: false, isFailed: error.response.data.msg });
    }
  }

  async filterBooks(categoryId) {
    this.setState({ isLoading: true });
    try {
      let {
        books,
        currentPage,
        totalPages,
      } = await this._bookService.filterByCategory(categoryId);
      this.setState({ books, isLoading: false, currentPage, totalPages });
    } catch (error) {
      if (error.response)
        this.setState({ isLoading: false, isFailed: error.response.data.msg });
    }

    if (!this.filterQuery) {
      this.setSpecificQueryParam("category", categoryId);
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    let {
      isLoading,
      categories,
      books,
      isFailed,
      totalPages,
      currentPage,
    } = this.state;
    return (
      <div className={book_list}>
        <div className="container">
          {isLoading && <p className="text-center">Loading ...</p>}
          {isFailed && (
            <>
              <button className={back_btn} onClick={this.goBack}>
                <span className="mr-2">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
                Go Back
              </button>
              <p className="text-center">{isFailed}</p>
            </>
          )}
          {!isLoading && !isFailed && (
            <>
              <section className={book_list_category}>
                {/* <div className={booklist_bar}>
                  <SearchBar type="booklist"/>
                </div> */}
                <a
                  href="/books"
                  className={`${!this.filterQuery && active} ${category_btn}`}
                >
                  All
                </a>
                {categories &&
                  categories.map((category) => {
                    return (
                      <a
                        key={category._id}
                        href={`/books?category=${category._id}`}
                        className={`${
                          this.filterQuery === category._id && active
                        } ${category_btn}`}
                      >
                        {category.name}
                      </a>
                    );
                  })}
              </section>
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
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                updatePageNumber={this.updateUrlWithPageOfBookList}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
