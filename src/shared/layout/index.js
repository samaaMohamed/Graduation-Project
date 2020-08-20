import React, { Component } from "react";
import Header from "shared/header";
import Footer from "shared/footer";

export default class Layout extends Component {
  render() {
    let { children } = this.props;
    return (
      <>
        <Header />
        <main style={{ marginBottom: "25rem", marginTop: "10rem" }}>
          {children}
        </main>
        <Footer />
      </>
    );
  }
}
