import React, { Component } from "react";
import BookCard from "modules/books/components/bookCard";
import book_photo from "assets/book.jpeg";
import { book_list, book_list_category } from "./style.module.css";
import Pagination from "shared/pagination";

export default class BookList extends Component {
  state = {
    books: [
      {
        id: 1,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "5",
      },
      {
        id: 2,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "5",
      },
      {
        id: 3,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "4",
      },
      {
        id: 4,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "2",
      },
      {
        id: 5,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "3",
      },
      {
        id: 6,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "4",
      },
      {
        id: 7,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "5",
      },
      {
        id: 8,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "3",
      },
      {
        id: 9,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "4",
      },
      {
        id: 10,
        cover: book_photo,
        title: "book1",
        author: "Mohamed",
        old_price: "$100",
        price: "$200",
        rate: "5",
      },
    ],
    Categories: [
      { id: 1, name: "islamic" },
      { id: 2, name: "islamic" },
      { id: 3, name: "islamic" },
      { id: 4, name: "islamic" },
      { id: 4, name: "islamic" },
      { id: 5, name: "islamic" },
    ],
  };
  render() {
    return (
      <div className={book_list}>
        <div className="container">
          <section className={book_list_category}>
            {this.state.Categories &&
              this.state.Categories.map((Category) => {
                return <button>{Category.name}</button>;
              })}
          </section>
          <div className="row">
            {this.state.books &&
              this.state.books.map((book) => {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <BookCard book={book} />
                  </div>
                );
              })}
          </div>
          <Pagination />
        </div>
      </div>
    );
  }
}
