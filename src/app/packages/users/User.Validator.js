import * as yup from "yup";
import LocaleKeys from "../../locales";

const email = yup
  .string()
  .email(LocaleKeys.INVALID_EMAIL)
  .required(LocaleKeys.REQUIRED_EMAIL);

const password = yup
  .string()
  .required(LocaleKeys.REQUIRED_PASSWORD)
  .min(8, LocaleKeys.INVALID_PASSWORD)
  .max(100, LocaleKeys.INVALID_PASSWORD)
  .matches(
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[0-9]).*$/,
    LocaleKeys.INVALID_PASSWORD
  );

export const loginValidator = yup.object().shape({ email, password });

export const registrationValidator = yup.object().shape({ email });

export const changePasswordValidator = yup
  .object()
  .shape({ oldPassword: password, newPassword: password });
