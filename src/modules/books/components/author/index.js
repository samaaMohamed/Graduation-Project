import React, { Component } from "react";
import book_photo from "assets/book.jpeg";
import BookCard from "../bookCard";
import { book_list } from "./style.module.css";
import Pagination from "shared/pagination";

export default class Author extends Component {
  state = {
    authorName: "Author 1",
    books: [
      {
        id: 1,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "5",
      },
      {
        id: 2,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "5",
      },
      {
        id: 3,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "4",
      },
      {
        id: 4,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "2",
      },
      {
        id: 5,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "3",
      },
      {
        id: 6,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "4",
      },
      {
        id: 7,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "5",
      },
      {
        id: 8,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "3",
      },
      {
        id: 9,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "4",
      },
      {
        id: 10,
        cover: book_photo,
        name: "book1",
        author: "auth",
        old_price: "$100",
        price: "$200",
        rate: "5",
      },
    ],
  };
  render() {
    let { books, authorName } = this.state;
    return (
      <div className={book_list}>
        <div className="container">
          <h2>{authorName}</h2>
          <div className="row">
            {books &&
              books.map((book) => {
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
