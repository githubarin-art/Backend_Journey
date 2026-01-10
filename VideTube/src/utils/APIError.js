class APIError extends Error {
  constructor(statusCode, data, message = "Something went wrong", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.errors = errors;
    this.stack = stack;
  }
}

export { APIError };
