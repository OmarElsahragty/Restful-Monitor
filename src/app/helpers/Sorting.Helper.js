/* eslint-disable no-restricted-syntax */

export default (params) => {
  const sortArr = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === "ASC" || value === "DESC") {
      sortArr.push([key, value]);
    }
  }

  return sortArr;
};
