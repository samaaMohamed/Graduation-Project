import React, { Component } from "react";
import {
  login_form,
  login_form_control,
  login_form_container,
  login_form_heading,
  login_form_input,
  label,
  login_btn,
} from "./style.module.css";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    this.setState({ email: "", password: "" });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    let { email, password } = this.state;
    return (
      <div className={login_form_container}>
        <h1 className={login_form_heading}>Login to your account</h1>
        <form className={login_form} autoComplete="off">
          <div className={login_form_input}>
            <label className={label}>Email</label>
            <input
              className={login_form_control}
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={email}
              id="email"
            />
          </div>
          <div className={login_form_input}>
            <label className={label}>password</label>
            <input
              className={login_form_control}
              name="password"
              type="password"
              placeholder="password"
              onChange={this.handleChange}
              value={password}
              id="password"
            />
          </div>
        </form>
        <button className={login_btn} type="submit">
          Login
        </button>
      </div>
    );
  }
}
