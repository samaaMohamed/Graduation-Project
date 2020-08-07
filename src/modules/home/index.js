import React, { Component } from "react";
import Intro from "./components/introSection";
import BestReviewedBooks from "modules/books/components/bestReviewedBooks";
import LatestAddedBooks from "modules/books/components/latestAddBooks";
import BookCard from './../books/bookCard/index';

export default class Home extends Component {
  render() {
    // حاطه البوك كارد هنا لييييييييييييييه
    return (
      <>
        <Intro />
        <div className="container">
          <BestReviewedBooks />
          <LatestAddedBooks />
          
        </div>
      </>
    );
  }
}
