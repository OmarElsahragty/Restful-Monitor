import BaseController from "./Base.Controller";
import { monitorsPackage } from "../../app/packages";

class MonitorsController extends BaseController {
  create = async (req, res, next) => {
    const data = await this.exec(
      next,
      monitorsPackage.create,
      req.body,
      req.userEmail
    );
    if (data) return this.okRes(req, res, data);
  };

  edit = async (req, res, next) => {
    const data = await this.exec(
      next,
      monitorsPackage.edit,
      req.params.monitorName,
      req.body,
      req.userEmail
    );
    if (data) return this.okRes(req, res, data);
  };

  show = async (req, res, next) => {
    const data = await this.exec(
      next,
      monitorsPackage.show,
      req.params.monitorName
    );
    if (data) return this.okRes(req, res, data);
  };

  showAll = async (req, res, next) => {
    const data = await this.exec(next, monitorsPackage.showAll, req.query.tag);
    if (data) return this.okRes(req, res, data);
  };

  pause = async (req, res, next) => {
    const data = await this.exec(
      next,
      monitorsPackage.pauseResume,
      req.params.monitorName
    );
    if (data) return this.okRes(req, res, data);
  };

  pauseAll = async (req, res, next) => {
    const data = await this.exec(
      next,
      monitorsPackage.pauseResumeAll,
      req.query.tag
    );
    if (data) return this.okRes(req, res, data);
  };

  resume = async (req, res, next) => {
    const data = await this.exec(
      next,
      monitorsPackage.pauseResume,
      req.params.monitorName,
      true
    );
    if (data) return this.okRes(req, res, data);
  };

  resumeAll = async (req, res, next) => {
    const data = await this.exec(
      next,
      monitorsPackage.pauseResumeAll,
      req.query.tag,
      true
    );
    if (data) return this.okRes(req, res, data);
  };

  destroy = async (req, res, next) => {
    const data = await this.exec(
      next,
      monitorsPackage.cancel,
      req.params.monitorName
    );
    if (data) return this.okRes(req, res, data);
  };

  destroyAll = async (req, res, next) => {
    const data = await this.exec(
      next,
      monitorsPackage.cancelAll,
      req.query.tag
    );
    if (data) return this.okRes(req, res, data);
  };
}
export default new MonitorsController();
