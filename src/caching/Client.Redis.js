import { createClient } from "redis";
import Config from "../../config";

export default createClient({
  host: Config.Caching.Host,
  port: Config.Caching.Port,
});
