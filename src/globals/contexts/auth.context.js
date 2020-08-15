import React, { Component, createContext } from "react";
export const UserProvider = createContext();

export default class UserContext extends Component {
  state = {
    isAuthenticated: !!localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
  };

  toggleAuthenticationStatus = () => {
    let { isAuthenticated } = this.state;
    this.setState({ isAuthenticated: !isAuthenticated });
  };

  render() {
    return (
      <UserProvider.Provider
        value={{
          ...this.state,
          toggleAuthenticationStatus: this.toggleAuthenticationStatus,
        }}
      >
        {this.props.children}
      </UserProvider.Provider>
    );
  }
}
