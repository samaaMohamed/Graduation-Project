import React, { Component } from "react";
import UserService from "modules/account/services/account.service";

import {
  profile_intro,
  profile,
  order_item,
  profile_orders,
  text_red,
} from "./style.module.css";
import Loading from "shared/loading";

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
    if (!userId) this.props.history.push("/login?returnUrl=profile");
    this.setState({ isLoading: true });
    let user = await this._userService.getById(userId);
    this.setState({ user, isLoading: false });
  }
  render() {
    let { user, isLoading } = this.state;
    return (
      <div className={`${profile} container`}>
        {isLoading && <Loading />}
        {user ? (
          <>
            <section className={`${profile_intro} text-center`}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p>{user.location}</p>
            </section>

            <section className={`${profile_orders} card`}>
              {user.orders.length > 0 && (
                <h2 className="mb-5 text-center">My orders</h2>
              )}
              <ul className="list-unstyled">
                {user.orders.length > 0 ? (
                  user.orders.map((order) => {
                    if (
                      order.status === "delivered" ||
                      order.status === "cancelled"
                    ) {
                      return (
                        <li className={order_item} key={order._id}>
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
                  })
                ) : (
                  <p
                    className="text-center"
                    style={{ color: "rgba(0, 0, 0, 0.6)" }}
                  >
                    Your cancelled and delivered orders will be shown here.
                  </p>
                )}
              </ul>
            </section>
          </>
        ) : (
          !isLoading && (
            <p>
              An error occurred, please refresh or make sure to{" "}
              <a href="/login?returnUrl=/profile">login</a>
            </p>
          )
        )}
      </div>
    );
  }
}
