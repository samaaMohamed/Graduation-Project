import React, { Component } from "react";
import SocialLinks from "shared/socialLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  header,
  logo,
  headerLink,
  headeritem,
  nav_togger,
  header_bar,
} from "./style.module.css";
import { Link } from "react-router-dom";
import SearchBar from "shared/searchBar";

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
            className={`${"navbar-toggler"} ${nav_togger}`}
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon className={nav_togger} icon={faBars} />
          </button>
          <ul className="navbar-nav mr-auto">
            <li>
              <SearchBar className={header_bar} type="header" />
            </li>
          </ul>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li>
                <SocialLinks />
              </li>
              <li className={`${"nav-item active"} ${headerLink}`}>
                <Link className={`${"nav-link"} ${headeritem}`} to="/">
                  Home
                </Link>
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
              <li className={`${"nav-item"} ${headerLink}`}>
                <Link className={`${"nav-link"} ${headeritem}`} to="/books">
                  Browse
                </Link>
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
