export default class AppError {
  readonly message: string;

  readonly errorCode: string;

  readonly statusCode: number;

  constructor(message: string, errorCode: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
