import LocaleKeys from "../app/locales";

export const SERVER_ERROR = (internalError) => {
  return {
    statusCode: 500,
    error: "Server Error",
    message: LocaleKeys.SERVER_ERROR,
    internalError,
  };
};
