import React, { Component } from "react";
import "./style.css";
import { CartProvider } from "globals/contexts/cart.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import OrderService from "modules/order/services/order.service";
import Loading from "shared/loading";

export default class CartPage extends Component {
  static contextType = CartProvider;
  state = {
    orders: [],
  };
  constructor(props) {
    super(props);

    this._orderService = new OrderService();
  }

  componentDidMount() {
    this.setState({ orders: this.context.orders });
  }

  changeQuantity = (e, orderName) => {
    let { orders } = this.state,
      orderToBeEdited = this.context.getOrderByName(orderName),
      orderIndex = this.getIndexOfItemFromArray(orderToBeEdited, orders);

    orderToBeEdited.quantity = e.target.value;
    orders.splice(orderIndex, 1, orderToBeEdited);
    this.context.setOrders(orders);
  };

  removeItemFromCart = (orderName) => {
    let { orders } = this.state,
      orderToBeEdited = this.context.getOrderByName(orderName),
      orderIndex = this.getIndexOfItemFromArray(orderToBeEdited, orders);

    orders.splice(orderIndex, 1);
    this.context.setOrders(orders);
  };

  checkout = async () => {
    let userId = JSON.parse(localStorage.getItem("user"))._id,
      { orders } = this.state;

    if (orders.length > 0) {
      this.setState({ isLoading: true });
      await this._orderService.checkoutOrders(userId, orders);
      this.clearCart();
      this.setState({ isLoading: false });
      alert("Your orders have been placed successfully");
      this.props.history.push("/tracking");
    }
  };

  clearCart = () => {
    this.setState({ orders: [] });
    this.context.clearCart();
  };

  getIndexOfItemFromArray = (item, array) => {
    let index;
    for (let i = 0; i < array.length; i++) {
      if (item === array[i]) {
        index = i;
        break;
      }
    }

    return index;
  };

  render() {
    let { orders, isLoading } = this.state;

    return (
      <section className="cart-container container page">
        <Loading isLoading={isLoading} />
        <section className="d-flex justify-content-between">
          <h1>Shopping Cart</h1>
          <section className="cart-actions d-flex flex-direction-column">
            <button
              className="btn btn-success mr-3"
              onClick={this.checkout}
              disabled={orders.length < 1}
            >
              Checkout
            </button>
            <button
              className="btn btn-danger"
              onClick={this.clearCart}
              disabled={orders.length < 1}
            >
              Clear
            </button>
          </section>
        </section>
        {orders.length > 0 ? (
          <table className="table table-borderless mt-5">
            <thead>
              <th scope="col" colSpan="2">
                Item
              </th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td colSpan="2">
                    <a href={`/books/${order.bookId}`}>{order.bookName}</a>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={order.quantity}
                      onChange={(e) => this.changeQuantity(e, order.bookName)}
                    />
                  </td>
                  <td>
                    {order.currency}
                    {order.price}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.removeItemFromCart(order.bookName)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center my-5">No items in the cart !</p>
        )}
      </section>
    );
  }
}
