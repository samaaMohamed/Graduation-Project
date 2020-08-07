import React, { Component } from "react";
import { search_bar, search_icon } from "./style.module.css";
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
  render() {
    let { name } = this.state;

    return (
      <>
        <form>
          <input
            className={search_bar}
            name="search"
            type="text"
            placeholder="search"
            onChange={this.handleChange}
            value={name}
          />
          <span>
            <FontAwesomeIcon className={search_icon} icon={faSearch} />
          </span>
        </form>
      </>
    );
  }
}
