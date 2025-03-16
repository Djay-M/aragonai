/* eslint-disable no-unused-vars */
const httpStatus = require("http-status");
const _ = require("lodash");
const { isCelebrateError } = require("celebrate");
const APIError = require("../utils/APIErrors");

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
exports.handler = (err, req, res, next) => {
  const response = {
    code: err?.status,
    message: err?.message || httpStatus[err.status || 500],
    errors: err?.errors,
    stack: err?.stack,
  };

  res.status(400);
  res.json(response);
  res.end();
};

/**
 * If error is Validation Error, convert it.
 * @public
 */
exports.validationError = (err, req, res, next) => {
  const { joi, meta, details } = err;
  const detailsBody = details?.get("body");
  const detailsParams = details?.get("params");
  const detailsQuery = details?.get("query");

  const error = new APIError({
    message: "Validation Error",
    errors: joi?.message,
    status: httpStatus.BAD_REQUEST,
    stack: {
      source: meta?.source,
      keys: [
        detailsBody?.message ||
          detailsParams?.message ||
          detailsQuery?.message ||
          "",
      ],
    },
  });

  return this.handler(error, req, res);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  if (isCelebrateError(err)) return this.validationError(err, req, res, next);
  let convertedError = err;
  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return this.handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: "API Not Found, Wrong API Path",
    status: httpStatus.NOT_FOUND,
  });
  return this.handler(err, req, res);
};
