import { MultiMessages } from "../helpers";
import Errors from "../../errors";

export default (schema) => (req, _, next) => {
  try {
    const validatedData = schema.validateSync(req.body, {
      abortEarly: false,
      strict: false,
      stripUnknown: true,
    });
    req.body = validatedData;
    next();
  } catch (err) {
    return next(Errors.http.badRequest(MultiMessages(err.errors, req)));
  }
};
