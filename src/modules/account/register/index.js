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

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };
  // handleConfirmationPassword =(e)=>{
  //   if (password == confirm){

  //   }
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    let { name, email, password, location } = this.state;
    return (
      <div className={register_form_container}>
        <h1 className={register_form_heading}>new customer</h1>
        <form className={register_form} autoComplete="off">
          <div className={register_form_input}>
            <label className={label}>Name</label>
            <input
              className={register_form_control}
              name="name"
              type="name"
              placeholder="name"
              onChange={this.handleChange}
              value={name}
            />
          </div>
          <div className={register_form_input}>
            <label className={label}>Email</label>
            <input
              className={register_form_control}
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div className={register_form_input}>
            <label className={label}>password</label>
            <input
              className={register_form_control}
              name="password"
              type="password"
              placeholder="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <div className={register_form_input}>
            <label className={label}>Password Confirmation </label>
            <input
              className={register_form_control}
              name="password"
              type="password"
              placeholder="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <div className={register_form_input}>
            <label className={label}>Location </label>
            <input
              className={register_form_control}
              name="text"
              type="text"
              placeholder="eg:cairo,egypt"
              onChange={this.handleChange}
              value={location}
            />
          </div>
          <button className={register_btn} type="submit">
            create
          </button>
        </form>
      </div>
    );
  }
}
