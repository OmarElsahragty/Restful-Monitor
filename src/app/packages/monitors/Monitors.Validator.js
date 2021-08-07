import * as yup from "yup";
import LocaleKeys from "../../locales";

/* eslint-disable no-useless-escape */

export const monitor = yup.object().shape(
  {
    website: yup.string().when("address", {
      is: null,
      then: yup.string().required(LocaleKeys.REQUIRED_WEBSITE_DOMAIN),
      otherwise: yup.string().nullable(),
    }),
    address: yup.string().when("website", {
      is: null,
      then: yup.string().required(LocaleKeys.REQUIRED_WEBSITE_DOMAIN),
      otherwise: yup.string().nullable(),
    }),
    port: yup.string().when("website", {
      is: null,
      then: yup.string().required(LocaleKeys.REQUIRED_WEBSITE_DOMAIN),
      otherwise: yup.string().nullable(),
    }),
    method: yup.string().required(LocaleKeys.REQUIRED_METHOD),
    path: yup.string().nullable(),
    query: yup.mixed().nullable(),
    body: yup.mixed().nullable(),
    headers: yup.mixed().nullable(),
    ignoreSSL: yup.boolean().nullable(),
    generateId: yup.boolean().nullable(),
    interval: yup.number().nullable(),
    intervalUnits: yup.string().nullable(),
    assert: yup.object({
      statusCode: yup.number().required(LocaleKeys.REQUIRED_STATUS_CODE),
    }),
    webhook: yup
      .string()
      .matches(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        LocaleKeys.INCORRECT_WEBHOOK
      )
      .nullable(),
  },
  [["address", "website"]]
);

export const monitors = yup.object().shape({
  nameTag: yup.string().required(LocaleKeys.REQUIRED_NAME_TAG),
  monitors: yup.array().of(monitor),
});
