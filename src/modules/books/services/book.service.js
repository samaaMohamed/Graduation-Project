import CoreService from "globals/core.service";

export default class BookService extends CoreService {
  constructor() {
    super();
    this.initialize("/books");
    this.list = this.list.bind(this);
  }

  async list(page = 1, limit = 10) {
    let reqUrl = `${this.url}/list?page=${page}&limit=${limit}`;

    let { data } = await this._http.get(reqUrl),
      orders = JSON.parse(localStorage.getItem("orders")) || [];
    data.books.forEach((book) => {
      for (let order of orders) {
        if (book.name === order.bookName) {
          book.inCart = true;
          break;
        } else {
          book.inCart = false;
        }
      }
    });
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

  async search(query) {
    let reqUrl = `${this.url}/search?q=${query}`;

    let { data: records } = await this._http.get(reqUrl);
    return records;
  }

  async getBookDetails(bookId) {
    let reqUrl = `${this.url}/${bookId}`,
      { data: record } = await this._http.get(reqUrl),
      orders = JSON.parse(localStorage.getItem("orders")) || [];

    for (let order of orders) {
      if (record.name === order.bookName) {
        record.inCart = true;
        break;
      }
    }
    return record;
  }

  async addReview(bookId, reviewObj) {
    let reqUrl = `${this.url}/${bookId}/reviews/new`;

    let {
      data: { msg },
    } = await this._http.post(reqUrl, reviewObj);
    return msg;
  }
}
