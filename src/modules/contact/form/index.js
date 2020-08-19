import React, { Component } from "react";
import {
  contact,
  contact_heading,
  contact_form,
  contact_form_control,
  contact_form_submit,
  contact_form_control_message,
} from "./style.module.css";
import {
  isValidText,
  isEmailValid,
  isContainingNumbers,
  isPhoneValid,
} from "../services/validation.services";
import Info from "../info";
import ContactService from "../services/contact.services";

export default class Form extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    message: "",
    success: false,
    errorMsg: "",
  };

  constructor(props) {
    super(props);
    this._contactService = new ContactService();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let { name, email, phone, message } = this.state;

    if (
      name.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      message.length === 0
    ) {
      this.setState({ errorMsg: "Please fill all the fields !" });
    } else if (!isValidText(name) || isContainingNumbers(name)) {
      this.setState({
        errorMsg:
          "Please type your name correctly without any symbols or numbers !",
      });
    } else if (!isEmailValid(email)) {
      this.setState({ errorMsg: "Please type a valid email !" });
    } else if (!isPhoneValid(phone)) {
      this.setState({ errorMsg: "Please type a valid phone number !" });
    } else {
      this.setState({ errorMsg: "", isLoading: true });
      this._contactService
        .create({ name, email, phone, message })
        .then((response) => {
          alert("Your message has been sent successfully");
          this.setState({
            name: "",
            email: "",
            phone: "",
            message: "",
            isLoading: false,
          });
        })
        .catch((err) => {
          this.setState({ isLoading: false });
          alert(err.response.data.msg);
        });
    }
  };
  render() {
    let { name, email, phone, message, errorMsg, isLoading } = this.state;
    return (
      <>
        <section className={contact}>
          <div className="container">
            <h2 className={contact_heading}> Contact us</h2>
            {errorMsg && (
              <span className="alert alert-danger d-block w-50">
                {errorMsg}
              </span>
            )}
            <div className="row mt-3">
              <div className="col-lg-6 col-md-12">
                <form
                  onSubmit={this.handleSubmit}
                  className={contact_form}
                  noValidate
                >
                  <input
                    className={contact_form_control}
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={this.handleChange}
                    value={name}
                  />
                  <input
                    className={contact_form_control}
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={email}
                  />
                  <input
                    className={contact_form_control}
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    onChange={this.handleChange}
                    value={phone}
                  />
                  <textarea
                    className={`${contact_form_control} ${contact_form_control_message}`}
                    name="message"
                    type="text"
                    placeholder="Type Your Message"
                    onChange={this.handleChange}
                    value={message}
                  ></textarea>
                  <button
                    className={contact_form_submit}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending ..." : "Send"}
                  </button>
                </form>
              </div>
              <div className="col-lg-6 col-md-12">
                <Info />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
