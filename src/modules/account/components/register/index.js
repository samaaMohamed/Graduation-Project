import React, { Component } from "react";
import {
  register_form,
  register_form_control,
  register_form_container,
  register_form_heading,
  register_form_input,
  label,
  register_btn,
} from "./style.module.css";
import { isTextValid, isEmpty } from "globals/helpers/text.validator";
import { isEmailValid } from "globals/helpers/email.validator";
import { UserProvider } from "globals/contexts/auth.context";
import AccountService from "modules/account/services/account.service";

export default class Register extends Component {
  static contextType = UserProvider;

  state = {
    user: {
      name: "",
      email: "",
      password: "",
      location: "",
    },
    confirmPassword: "",
    passwordConfirmationErr: "",
  };

  constructor(props) {
    super(props);

    this._accountService = new AccountService();
  }

  componentDidMount() {
    let { isAuthenticated } = this.context;
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleConfirmationPassword = (e) => {
    let {
      user: { password },
      confirmPassword,
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        passwordConfirmationErr: "The 2 passwords are not similar",
      });
    } else {
      this.setState({
        passwordConfirmationErr: "",
      });
    }
  };

  handleChange = (e) => {
    let { user } = this.state;
    if (e.target.name === "confirmPassword") {
      return this.setState({ confirmPassword: e.target.value }, () =>
        this.handleConfirmationPassword()
      );
    }
    this.setState({
      user: {
        ...user,
        [e.target.name]: e.target.value,
      },
    });
  };

  createUser = async (e) => {
    e.preventDefault();
    let { toggleAuthenticationStatus } = this.context;

    let {
      user: { name, email, password, location },
    } = this.state;

    if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(location)
    ) {
      this.setState({ validationErrorMsg: "Please fill all the fields !" });
    } else if (!isTextValid(name)) {
      this.setState({
        validationErrorMsg:
          "Please type your name correctly without any symbols !",
      });
    } else if (!isEmailValid(email)) {
      this.setState({ validationErrorMsg: "Please type a valid email !" });
    } else {
      try {
        await this._accountService.create({ name, email, password, location });
        await this._accountService.login({ email, password });
        this.setState({
          isLoading: false,
          success: "Logged in successfully",
          error: "",
        });
        toggleAuthenticationStatus();
        if (this.props.location.pathname !== "/register") {
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
    }
  };

  render() {
    let {
      user: { name, email, password, location },
      confirmPassword,
      passwordConfirmationErr,
      validationErrorMsg,
      success,
      error,
      isLoading,
    } = this.state;
    return (
      <div className={register_form_container}>
        <h1 className={register_form_heading}>new customer</h1>
        <form
          className={register_form}
          autoComplete="off"
          onSubmit={this.createUser}
        >
          {validationErrorMsg && (
            <span className="alert alert-danger d-block w-50">
              {validationErrorMsg}
            </span>
          )}
          <div className={`${register_form_input} form-group`}>
            <label className={label}>Name</label>
            <input
              className={`${register_form_control} form-control`}
              name="name"
              type="name"
              placeholder="name"
              onChange={this.handleChange}
              value={name}
            />
          </div>
          <div className={`${register_form_input} form-group`}>
            <label className={label}>Email</label>
            <input
              className={`${register_form_control} form-control`}
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div className={`${register_form_input} form-group`}>
            <label className={label}>Password</label>
            <input
              className={`${register_form_control} form-control`}
              name="password"
              type="password"
              placeholder="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <div className={`${register_form_input} form-group`}>
            <label className={label}>Confirm Password</label>
            <input
              className={`${register_form_control} form-control`}
              name="confirmPassword"
              type="password"
              placeholder="Type your password again"
              onChange={this.handleChange}
              value={confirmPassword}
            />
            <small>{passwordConfirmationErr}</small>
          </div>
          <div className={`${register_form_input} form-group`}>
            <label className={label}>Location </label>
            <input
              className={`${register_form_control} form-control`}
              name="text"
              type="text"
              placeholder="eg: Cairo, Egypt"
              onChange={this.handleChange}
              value={location}
            />
          </div>
          <button className={register_btn} type="submit" disabled={isLoading}>
            {isLoading ? "Loading ..." : "Create"}
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
