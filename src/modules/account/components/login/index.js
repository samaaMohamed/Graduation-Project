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
import AccountService from "modules/account/services/account.service";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  constructor(props) {
    super(props);
    this._accountService = new AccountService();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginUser = async (e) => {
    e.preventDefault();
    let { toggleAuthenticationStatus } = this.context;

    this.setState({
      isLoading: true,
    });
    let { email, password } = this.state;
    try {
      await this._accountService.login({ email, password });
      this.setState({
        isLoading: false,
        success: "Logged in successfully",
        error: "",
      });
      toggleAuthenticationStatus();
      if (this.props.location.pathname !== "/login") {
        window.location.reload();
      } else {
        this.props.history.push("/");
      }
    } catch (err) {
      this.setState({
        isLoading: false,
        success: null,
        error: err.response && err.response.data.msg,
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 3000);
    }
  };

  render() {
    let { email, password, success, error, isLoading } = this.state;
    return (
      <div className={login_form_container}>
        <h1 className={`${login_form_heading} mb-5`}>Login to your account</h1>
        <form
          className={login_form}
          autoComplete="off"
          onSubmit={this.loginUser}
        >
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
          <button className={login_btn} type="submit" disabled={isLoading}>
            {isLoading ? "Logging you in ..." : "Login"}
          </button>
          {!!success && (
            <p className="alert alert-success text-center">{success}</p>
          )}
          {!!error && <p className="alert alert-danger text-center">{error}</p>}
        </form>
      </div>
    );
  }
}
