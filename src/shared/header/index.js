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
import { UserProvider } from "globals/contexts/auth.context";
import AccountService from "modules/account/services/account.service";

export default class Header extends Component {
  static contextType = UserProvider;
  constructor(props) {
    super(props);
    this._accountService = new AccountService();
  }

  logoutUser = async (e) => {
    e.preventDefault();
    await this._accountService.logout();

    let { toggleAuthenticationStatus } = this.context;
    toggleAuthenticationStatus();
    window.location.href = "/login";
  };

  render() {
    let { isAuthenticated } = this.context;
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
                <Link className={`${"nav-link"} ${headeritem}`} to="/books">
                  Browse
                </Link>
              </li>
              <li className={`${"nav-item"} ${headerLink}`}>
                <Link className={`${"nav-link"} ${headeritem}`} to="/contact">
                  Contact
                </Link>
              </li>
              {!isAuthenticated ? (
                <>
                  <li className={`${"nav-item"} ${headerLink}`}>
                    <Link className={`${"nav-link"} ${headeritem}`} to="/login">
                      login
                    </Link>
                  </li>
                  <li className={`${"nav-item "} ${headerLink}`}>
                    <Link
                      className={`${"nav-link"} ${headeritem}`}
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className={`${"nav-item "} ${headerLink}`}>
                    <Link
                      className={`${"nav-link"} ${headeritem}`}
                      to="/profile"
                      tabIndex={-1}
                      aria-disabled="true"
                    >
                      <FontAwesomeIcon icon={faUserCircle} />
                    </Link>
                  </li>
                  <li className={`${"nav-item "} ${headerLink}`}>
                    <a
                      href="/"
                      className={`${"nav-link"} ${headeritem}`}
                      onClick={this.logoutUser}
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
