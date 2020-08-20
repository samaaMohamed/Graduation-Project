import React, { Component } from "react";
import UserService from "modules/account/services/account.service";

import {
  profile_intro,
  profile,
  order_item,
  profile_orders,
  text_red,
} from "./style.module.css";

export default class Profile extends Component {
  state = {
    user: null,
  };
  constructor(props) {
    super(props);
    this._userService = new UserService();
  }
  async componentDidMount() {
    let userId = JSON.parse(localStorage.getItem("user"))._id;
    let user = await this._userService.getById(userId);
    this.setState({ user });
  }
  render() {
    let { user } = this.state;
    return (
      <div className={`${profile} container`}>
        {user ? (
          <>
            <section className={`${profile_intro} text-center`}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.location}</p>
            </section>

            <section className={`${profile_orders} card`}>
              <h2 className="mb-5">My orders</h2>
              <ul className="list-unstyled">
                {user.orders.map((order) => {
                  if (
                    order.status === "delivered" ||
                    order.status === "cancelled"
                  ) {
                    return (
                      <li className={order_item}>
                        <section className="d-flex justify-content-between">
                          <h3>{order.bookName}</h3>
                          <p className={text_red}>{order.status}</p>
                        </section>
                        <p>
                          {order.currency} {order.price}
                        </p>
                      </li>
                    );
                  } else return "";
                })}
              </ul>
            </section>
          </>
        ) : (
          <p className="text-center">Loading ...</p>
        )}
      </div>
    );
  }
}
