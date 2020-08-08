import React, { Component } from "react";
import {
  search_bar,
  search_icon,
  search_bar_container,
  intro_bar,
  header_bar,
} from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class SearchBar extends Component {
  state = {
    name: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  returnBarTypeClass = () => {
    let { type } = this.props;
    if (type === "header") {
      return header_bar;
    } else if (type === "booklist") {
      // return booklist_bar;
    } else if (type === "intro") {
      return intro_bar;
    }
  };
  render() {
    let { name } = this.state;

    return (
      <>
        <form>
          <section className={search_bar_container}>
            <input
              className={`${search_bar} ${this.returnBarTypeClass()} `}
              name="search"
              type="text"
              placeholder="search"
              onChange={this.handleChange}
              value={name}
            />
            <span className={search_icon}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </section>
        </form>
      </>
    );
  }
}
