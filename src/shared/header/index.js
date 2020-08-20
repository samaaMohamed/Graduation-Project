import React, { Component } from "react";
import SocialLinks from "shared/socialLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import {
  header,
  logo,
  headerLink,
  headeritem,
  nav_togger,
  header_bar,
  headerDropdownItem,
  cartICon,
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
          <Link className={`${"navbar-brand"} ${logo}`} to="/">
            E BOOK
          </Link>
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

          <div className="collapse navbar-collapse" id="navbarNav">
            <SearchBar className={header_bar} type="header" />
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
                  <li className="nav-item">
                    <Link
                      to="/cart"
                      className={`nav-link ${headeritem} ${cartICon}`}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>
                  </li>
                  <li className={`nav-item dropdown ml-4 ${headerLink}`}>
                    <a
                      className={`nav-link dropdown-toggle ${headeritem}`}
                      tabIndex={-1}
                      aria-disabled="true"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faUserCircle} />
                    </a>
                    <ul
                      className="list-unstyled dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li className={`nav-item ${headerDropdownItem}`}>
                        <Link
                          className={`nav-link dropdown-item ${headeritem}`}
                          to="/profile"
                          tabIndex={-1}
                          aria-disabled="true"
                        >
                          Profile
                        </Link>
                      </li>
                      <li className={`nav-item ${headerDropdownItem}`}>
                        <a
                          href="/"
                          className={`nav-link dropdown-item ${headeritem}`}
                          onClick={this.logoutUser}
                          tabIndex={-1}
                          aria-disabled="true"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
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
