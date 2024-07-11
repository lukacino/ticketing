import { CustomError } from "./CustornError";

export class NotFountError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFountError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not fount" }];
  }
}
