import CoreService from "globals/core.service";

export default class BookService extends CoreService {
  constructor() {
    super();
    this.initialize("/books");
    this.list = this.list.bind(this);
  }

  async list(page = 1, limit = 10) {
    let reqUrl = `${this.url}/list?page=${page}&limit=${limit}`;

    let { data } = await this._http.get(reqUrl);
    return data;
  }

  async listLatestAdded() {
    let reqUrl = `${this.url}/newest/list`;

    let { data: records } = await this._http.get(reqUrl);
    return records;
  }

  async listBestReviewed() {
    let reqUrl = `${this.url}/best/list`;

    let { data: records } = await this._http.get(reqUrl);
    return records;
  }

  async filterByCategory(categoryId) {
    let reqUrl = `${this.url}/filter/${categoryId}`;

    let { data: records } = await this._http.get(reqUrl);
    return records;
  }

  async searchByName(query) {
    let reqUrl = `${this.url}/search?q=${query}`;

    let { data: records } = await this._http.get(reqUrl);
    return records;
  }
}