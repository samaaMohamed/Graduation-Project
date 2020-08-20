import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./style.module.css";

export default class SocialLinks extends Component {
  render() {
    return (
      <div className={styles.socialLinks}>
        <ul className={`list-unstyled d-flex`}>
          <li>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className={`${styles.socialLinks_Facebook} ${styles.icon}`}
                icon={faFacebookF}
              />
            </a>
          </li>

          <li>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className={`${styles.socialLinks_twitter} ${styles.icon}`}
                icon={faTwitter}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className={`${styles.socialLinks_linkedin} ${styles.icon}`}
                icon={faLinkedin}
              />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
