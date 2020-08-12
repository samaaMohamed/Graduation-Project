import React, { Component } from "react";
import Header from "shared/header";
import Footer from "shared/footer";

export default class Layout extends Component {
  render() {
    let { children } = this.props;
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
  }
}
