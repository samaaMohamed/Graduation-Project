import CoreService from "globals/core.service";
export default class ContactService extends CoreService {
  constructor() {
    super();
    this.initialize("/message");
  }
}
