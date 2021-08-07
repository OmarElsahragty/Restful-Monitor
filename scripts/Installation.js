import Database from "../src/database";
import Seeders from "./Seeders";
import "../colors";

Database.connection
  .sync({
    force: process.env.NODE_ENV === "Rest", // ENABLED FORCE MODE ON REST
    alter: false, // DISABLED ALTER MODE
  })
  .then(async () => {
    await Seeders(Database); // SEEDING DATA

    // eslint-disable-next-line no-console
    console.log(
      `Database ${
        process.env.NODE_ENV === "Rest" ? "rested" : "initialized"
      } successfully`.success
    );
  })
  .catch((error) => console.error(`${error.message}`.error));
