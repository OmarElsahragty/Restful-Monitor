import BoomHttpErrors from "./Boom.Error";
import SequelizeDatabaseErrors from "./Sequelize.Error";
import { SERVER_ERROR } from "./Constants.Error";

class AppErrors {
  constructor() {
    this.http = new BoomHttpErrors();
    this.db = new SequelizeDatabaseErrors();
  }

  __handleHttpError(err) {
    if (err.isServer) {
      return SERVER_ERROR(err);
    } else return err.output.payload;
  }

  __handleUnknownError(err) {
    return SERVER_ERROR(err);
  }

  errorHandler(err) {
    if (this.http.isHttpError(err)) return this.http.handleError(err);
    if (this.db.isDatabaseError(err)) return this.db.handleError(err);
    return this.__handleUnknownError(err);
  }
}

export default new AppErrors();
