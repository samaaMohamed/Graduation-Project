import CoreService from "globals/core.service";

export default class CategoryService extends CoreService {
  constructor() {
    super();
    this.initialize("/categories");
  }
}
