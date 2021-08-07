import cors from "cors";
import express from "express";
import { usersRoutes, monitorsRoutes } from "./routes";
import { I18next, ErrorHandler } from "./middlewares";
import Config from "../../config";

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.setup();
  }

  setup() {
    this.app
      .use(cors())
      .use(I18next)
      .use(express.json())
      .disable("x-powered-by");

    this.app.get("/", (_, res) => res.redirect(Config.App.DocPage));

    this.app.use("/", usersRoutes);

    this.app.use("/", monitorsRoutes);

    this.app.use(ErrorHandler);
  }

  start() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Successfully started the server on port: ${this.port}`.success
      );
    });
  }
}

export default Server;
