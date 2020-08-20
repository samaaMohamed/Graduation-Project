import React, { Component, createContext } from "react";
export const CartProvider = createContext();

export default class CartContext extends Component {
  state = {
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  };

  getOrderByName = (orderName) => {
    let { orders } = this.state;
    return orders.find((order) => order.bookName === orderName);
  };

  setOrders = (orders) => {
    localStorage.setItem("orders", JSON.stringify(orders));
    this.setState({ orders });
  };

  addOrder = (order) => {
    let { orders } = this.state;
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    this.setState({ orders });
  };

  removeOrder = (orderName) => {
    let { orders } = this.state;
    let ordersList = orders.filter((order) => order.name !== orderName);
    localStorage.setItem("orders", JSON.stringify(ordersList));
    this.setState({ ordersList });
  };

  clearCart = () => {
    this.setState({ orders: [] });
    localStorage.removeItem("orders");
  };

  render() {
    return (
      <CartProvider.Provider
        value={{
          ...this.state,
          addOrder: this.addOrder,
          getOrders: this.getOrders,
          setOrders: this.setOrders,
          clearCart: this.clearCart,
          removeOrder: this.removeOrder,
          getOrderByName: this.getOrderByName,
        }}
      >
        {this.props.children}
      </CartProvider.Provider>
    );
  }
}
