import React, { Component } from "react";
import {
  intro_header_section,
  intro_header_section_photo,
} from "./style.module.css";
import intro_photo from "../../../../assets/intro.jpg";

export default class Intro extends Component {
  render() {
    return (
      <div className={intro_header_section}>
        <figcaption className={intro_header_section_photo}>
          <img src={intro_photo} alt="intro cover" />
        </figcaption>
      </div>
    );
  }
}
