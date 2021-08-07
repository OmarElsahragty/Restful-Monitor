import util from "util";
import Redis from "./Client.Redis";

export const get = async (key) => {
  Redis.get = util.promisify(Redis.get);
  return Redis.get(key)
    .then((data) => {
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const set = (key, value) => {
  Redis.set = util.promisify(Redis.set);
  return Redis.set(
    key,
    typeof value === "string" ? value : JSON.stringify(value)
  )
    .then(() => value)
    .catch((err) => {
      throw err;
    });
};

export const destroy = async (key) => {
  const value = await get(key);

  Redis.del = util.promisify(Redis.del);
  return Redis.del(key)
    .then(() => value)
    .catch((err) => {
      throw err;
    });
};
