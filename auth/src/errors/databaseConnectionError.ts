import { CustomError } from "./CustornError";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connetion to database";
  constructor() {
    super("Error connecting to db");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
