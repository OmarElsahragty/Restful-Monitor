import Errors from "../../errors";
import { Logger } from "../../utilities";
import { MultiMessages } from "../helpers";

// eslint-disable-next-line no-unused-vars
export default (err, req, res, _) => {
  const handledError = Errors.errorHandler(err);

  const message =
    typeof handledError.message === "string"
      ? req.t(handledError.message)
      : MultiMessages(handledError.message, req);

  if (handledError.statusCode === 500) {
    Logger.error(
      `${handledError.statusCode} - ${handledError.internalError} - ${req.method} ${req.originalUrl} - ${req.ip}`
    );
  } else if (process.env.NODE_ENV === "Development") {
    Logger.error(
      `${handledError.statusCode} - ${message} - ${req.method} ${req.originalUrl} - ${req.ip}`
    );
  }

  return res.status(handledError.statusCode).send({
    error: {
      statusCode: handledError.statusCode,
      error: handledError.error,
      message,
    },
  });
};
