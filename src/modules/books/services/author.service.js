import CoreService from "globals/core.service";

export default class AuthorService extends CoreService {
  constructor() {
    super();
    this.initialize("/authors");
    this.listAuthorBooks = this.listAuthorBooks.bind(this);
  }

  async listAuthorBooks(authorId) {
    let reqUrl = `${this.url}/${authorId}`;

    let { data: records } = await this._http.get(reqUrl);
    return records;
  }
}
