// class that'll make all errors in the app categorisable into operational and non-operational errors
/**
 * similar to Error class, but much cooler for this app
 */
exports.AppError = class extends Error {
  /**
   *
   * @param {string} message message that'll show up on err.message
   * @param {number} statusCode err status code
   */
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Error.captureStackTrace(this, this.constructor);
  }
};

// alternative for the ugly trycatch blocks
/**
 *  wrapper for async functions in the controller
 * @param {function} controller async function whose errors are to be caught
 * @returns a function similar to express's middleware which executes all the logic of the passed function
 */
exports.catchErrors = function (controller) {
  return (req, res, next) => {
    controller(req, res, next).catch(err => next(err));
  };
};
