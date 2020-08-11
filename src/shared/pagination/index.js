import React, { Component } from "react";
import "./style.css";

export default class Pagination extends Component {
  state = {
    pagesArray: [],
  };
  createArrayOfPagesNumber() {
    let { totalPages } = this.props;
    console.log(Array.from(Array(totalPages + 1).keys()).slice(1));
    this.setState({
      pagesArray: Array.from(Array(totalPages + 1).keys()).slice(1),
    });
  }
  componentDidMount() {
    if (this.props.totalPages) this.createArrayOfPagesNumber();
  }
  render() {
    let { pagesArray } = this.state;
    let { updatePageNumber, currentPage, totalPages } = this.props;
    return (
      <nav
        className="pagination__container"
        aria-label="Page navigation example"
      >
        {pagesArray.length > 0 && (
          <ul className="pagination">
            <li className="page-item">
              {currentPage > 1 && (
                <button
                  className="page-link"
                  onClick={() => updatePageNumber(+currentPage - 1)}
                >
                  <span aria-hidden="true">«</span>
                </button>
              )}
            </li>
            {pagesArray.map((number) => (
              <li className="page-item" key={number}>
                <button
                  className={`page-link ${
                    +currentPage === number ? "active-tab" : ""
                  }`}
                  onClick={() => updatePageNumber(number)}
                  disabled={+currentPage === number}
                >
                  {number}
                </button>
              </li>
            ))}
            <li className="page-item">
              {currentPage < totalPages && (
                <button
                  className="page-link"
                  onClick={() => updatePageNumber(+currentPage + 1)}
                >
                  <span aria-hidden="true">»</span>
                </button>
              )}
            </li>
          </ul>
        )}
      </nav>
    );
  }
}
