import BaseController from "./Base.Controller";
import { usersPackage } from "../../app/packages";

class UsersController extends BaseController {
  login = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.authenticate, req.body);
    if (data) return this.okRes(req, res, data);
  };

  registration = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.create, req.body);
    if (data) return this.okRes(req, res, data);
  };

  changePassword = async (req, res, next) => {
    const data = await this.exec(
      next,
      usersPackage.changePassword,
      req.body,
      req.userId
    );
    if (data) return this.okRes(req, res, data);
  };
}
export default new UsersController();
