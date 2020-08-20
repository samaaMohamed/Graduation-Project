import CoreService from "globals/core.service";

export default class OrderService extends CoreService {
  constructor() {
    super();
    this.initialize("/users");
  }

  async checkoutOrders(userId, orders) {
    let reqUrl = `${this.url}/${userId}/orders/new`;

    let { data: record } = await this._http.post(reqUrl, orders);
    return record;
  }

  async getOngoingOrders(userId) {
    let reqUrl = `${this.url}/${userId}/orders/ongoing`;

    let { data: records } = await this._http.get(reqUrl);
    return records;
  }

  async cancelOrder(orderId, order) {
    let reqUrl = `${this.url}/orders/${orderId}`;

    let { data: records } = await this._http.put(reqUrl, order);
    return records;
  }
}
