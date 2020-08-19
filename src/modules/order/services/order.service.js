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
}
