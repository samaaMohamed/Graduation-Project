import React, { Component } from "react";
import Intro from "./components/introSection";
import BestReviewedBooks from "modules/books/components/bestReviewedBooks";
import LatestAddedBooks from "modules/books/components/latestAddBooks";

export default class Home extends Component {
  render() {
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
