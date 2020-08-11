import React, { Component } from "react";
import {
  pesonal_contact,
  pesonal_contact_icon,
  info_contact,
} from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default class Info extends Component {
  render() {
    return (
      <div className={info_contact}>
        <div className={pesonal_contact}>
          <FontAwesomeIcon
            className={pesonal_contact_icon}
            icon={faEnvelope}
            // size="lg"
          />
          <a href="mailto:samaamohammed@gmail.com">
            <span>samaamohammed@gmail.com</span>
          </a>
        </div>
        <div className={pesonal_contact}>
          <FontAwesomeIcon
            className={pesonal_contact_icon}
            icon={faPhoneAlt}
            // size="lg"
          />
          <a href="tel:01234567892">
            <span>01234567892</span>
          </a>
        </div>
        <div className={pesonal_contact}>
          <FontAwesomeIcon
            className={pesonal_contact_icon}
            icon={faMapMarkerAlt}
            // size="lg"
          />
          <a href="tel:01234567892">
            <span>PO Box 16122, Collins Street West, Victoria 8007</span>
          </a>
        </div>
      </div>
    );
  }
}
