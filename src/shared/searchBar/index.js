import React, { Component } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class SearchBar extends Component {
  state = {
    name: "",
  };
  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  returnBarTypeClass = () => {
    let { type } = this.props;
    if (type === "header") {
      return "header_bar";
    } else if (type === "booklist") {
      // return booklist_bar;
    } else if (type === "intro") {
      return "intro_bar";
    }
  };
  render() {
    let { name } = this.state;

    let barClass = this.returnBarTypeClass();

    return (
      <>
        <form>
          <section className="search_bar_container">
            <input
              className={`search_bar ${barClass}`}
              name="search"
              type="text"
              placeholder="search"
              onChange={this.handleChange}
              value={name}
            />
            <span className="search_icon">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </section>
        </form>
      </>
    );
  }
}
