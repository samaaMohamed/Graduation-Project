import CoreService from "globals/core.service";
export default class AccountService extends CoreService {
  constructor() {
    super();
    this.initialize("/users");
  }

  async login(credentials) {
    let response = await this._http.post(`${this.url}/login`, credentials);

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);

    return response;
  }

  async logout() {
    let response = await this._http.get(`${this.url}/logout`);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return response;
  }

  async getById(userId) {
    let { data: record } = await this._http.get(`${this.url}/me/${userId}`);
    return record;
  }
}
