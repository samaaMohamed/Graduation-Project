import React, { Component } from "react";
import OrderService from "modules/order/services/order.service";

import "./style.css";

export default class TrackingPage extends Component {
  state = {
    orders: null,
  };

  constructor(props) {
    super(props);
    this._orderService = new OrderService();
  }

  async componentDidMount() {
    let userId = JSON.parse(localStorage.getItem("user"))._id;
    if (!userId) this.props.history.push("/login");
    let orders = await this._orderService.getOngoingOrders(userId);
    this.setState({ orders });
  }

  render() {
    let { orders } = this.state;

    return (
      <div className="container tracking-orders">
        <h1>Your ongoing orders</h1>
        <small>Your items will be delivered within 14 days.</small>
        <ul className="list-unstyled mt-5 p-2">
          {orders &&
            orders.map((order) => (
              <li className="d-flex justify-content-between order-item">
                <section>
                  <h2>{order.bookName}</h2>
                  <p>{order.status}</p>
                </section>
                <button className="btn btn-danger">Cancel</button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
