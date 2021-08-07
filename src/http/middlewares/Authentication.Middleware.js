import jwt from "jsonwebtoken";
import Config from "../../../config";
import Errors from "../../errors";
import { usersPackage } from "../../app/packages";
import LocaleKeys from "../../app/locales";

export default (req, _, next) => {
  const token = req.headers.authentication;

  if (!token) {
    return next(Errors.http.unauthorized(LocaleKeys.NO_TOKEN));
  }

  jwt.verify(token, Config.JwtSecret, async (err, decoded) => {
    if (err) return next(Errors.http.unauthorized(LocaleKeys.UNAUTHORIZED));

    const isAuthorized = await usersPackage.checkUser(
      decoded.id,
      decoded.email
    );

    if (!isAuthorized.data) {
      return next(Errors.http.forbidden(LocaleKeys.FORBIDDEN));
    }

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  });
};
