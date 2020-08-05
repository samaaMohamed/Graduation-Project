import React, { Component } from "react";
import SocialLinks from "shared/socialLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { header, logo, headerLink, headeritem } from "./style.module.css";

export default class Header extends Component {
  render() {
    return (
      <nav
        className={`${"navbar navbar-expand-lg navbar-light fixed-top"} ${header}`}
      >
        <div className="container">
          <a className={`${"navbar-brand"} ${logo}`} href="#">
            E BOOK
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li>
                <SocialLinks />
              </li>
              <li className={`${"nav-item active"} ${headerLink}`}>
                <a className={`${"nav-link"} ${headeritem}`} href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className={`${"nav-item"} ${headerLink}`}>
                <a className={`${"nav-link"} ${headeritem}`} href="#">
                  login
                </a>
              </li>
              <li className={`${"nav-item "} ${headerLink}`}>
                <a className={`${"nav-link"} ${headeritem}`} href="#">
                  Register
                </a>
              </li>
              <li className={`${"nav-item "} ${headerLink}`}>
                <a
                  className={`${"nav-link"} ${headeritem}`}
                  href="#"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
