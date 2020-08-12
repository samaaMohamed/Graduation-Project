import React, { Component } from "react";
import {
  intro_header_section,
  intro_header_section_photo,
  intro_header_over_lay,
  intro_bar,
} from "./style.module.css";
import intro_photo from "../../../../assets/intro.jpg";
import SearchBar from "shared/searchBar";

export default class Intro extends Component {
  render() {
    return (
      <div className={intro_header_section}>
        <div className={intro_header_over_lay}>
          <div className="container">
            <div className={intro_bar}>
              <SearchBar type="intro" />
            </div>
          </div>
        </div>
        <figure className={intro_header_section_photo}>
          <img src={intro_photo} alt="intro cover" />
        </figure>
      </div>
    );
  }
}
