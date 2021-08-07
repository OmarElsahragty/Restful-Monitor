import { DatabaseConnection } from "./src/database";
import cachingClient from "./src/caching";
import Server from "./src/http/server";
import Config from "./config";
import "./colors";

/* eslint-disable no-console */

DatabaseConnection.authenticate()
  .then(() => {
    console.log(
      `Successfully connected to ${Config.Database.Name} database`.success
    );

    cachingClient.on("error", (err) => {
      throw err;
    });
    cachingClient.flushall();
    console.log(
      `Successfully connected to ${Config.Caching.Host}:${Config.Caching.Port} caching client and flushed`
        .success
    );

    new Server(Config.Port).start();
  })
  .catch((error) => console.error(`${error.message}`.error));
