import React, { Component } from "react";
import Intro from "./components/introSection";
import BestReviewedBooks from "modules/books/components/bestReviewedBooks";
import LatestAddedBooks from "modules/books/components/latestAddBooks";

export default class Home extends Component {
  render() {
    return (
      <>
        <Intro history={this.props.history} />
        <main className="container" style={{ marginBottom: "11rem" }}>
          <BestReviewedBooks />
          <LatestAddedBooks />
        </main>
      </>
    );
  }
}
