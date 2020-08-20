import React, { Component } from "react";
import OrderService from "modules/order/services/order.service";

import "./style.css";
import Loading from "shared/loading";

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
    this.redirectToBooksPageIfNoTrackingOrders();
  }

  componentDidUpdate() {
    this.redirectToBooksPageIfNoTrackingOrders();
  }

  redirectToBooksPageIfNoTrackingOrders = () => {
    let { orders } = this.state;
    if (!orders || orders.length < 1) {
      this.props.history.push("/books");
    }
  };

  cancelOrder = async (orderId) => {
    let { orders } = this.state;
    let order = this.state.orders.find((order) => order._id === orderId);
    order.status = "cancelled";
    this.setState({ isLoading: true });
    await this._orderService.cancelOrder(orderId, order);
    orders.splice(orders.indexOf(order), 1);
    this.setState({ isLoading: false, orders });
  };

  render() {
    let { orders, isLoading } = this.state;

    return (
      <div className="container tracking-orders">
        <Loading isLoading={isLoading} />
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
                <button
                  className="btn btn-danger"
                  onClick={() => this.cancelOrder(order._id)}
                >
                  Cancel
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
