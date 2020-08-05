import React, { Component } from "react";
import SocialLinks from "shared/socialLinks";
import { footer, footerSocialLinks } from "./style.module.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className={`${"text-center"} ${footer}`}>
        <span className={footerSocialLinks}>
          <SocialLinks />
        </span>
        <p>Copyright © Samaa Mohamed 2020</p>
      </footer>
    );
  }
}
