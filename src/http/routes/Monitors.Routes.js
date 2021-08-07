import express from "express";
import { Authenticate, validate } from "../middlewares";
import { monitorsController } from "../controllers";
import { monitorsPackage } from "../../app/packages";

const router = express.Router();

router.post(
  "/monitor",
  Authenticate,
  validate(monitorsPackage.validation.monitors),
  monitorsController.create
);

router.put(
  "/monitor/:monitorName",
  Authenticate,
  validate(monitorsPackage.validation.monitor),
  monitorsController.edit
);

router.get("/monitor/:monitorName", Authenticate, monitorsController.show);
router.get("/monitors", Authenticate, monitorsController.showAll);

router.patch(
  "/pauseMonitor/:monitorName",
  Authenticate,
  monitorsController.pause
);
router.patch("/pauseMonitors", Authenticate, monitorsController.pauseAll);

router.patch(
  "/resumeMonitor/:monitorName",
  Authenticate,
  monitorsController.resume
);
router.patch("/resumeMonitors", Authenticate, monitorsController.resumeAll);

router.delete(
  "/monitor/:monitorName",
  Authenticate,
  monitorsController.destroy
);
router.delete("/monitors", Authenticate, monitorsController.destroyAll);

export default router;
