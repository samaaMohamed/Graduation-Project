import React, { Component } from "react";

import { Facebook } from "react-content-loader";

export default class Loading extends Component {
  render() {
    return (
      <section style={{ margin: "15rem 0" }}>
        <Facebook />
      </section>
    );
  }
}
