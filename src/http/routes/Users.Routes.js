import express from "express";
import { Authenticate, validate } from "../middlewares";
import { usersController } from "../controllers";
import { usersPackage } from "../../app/packages";

const router = express.Router();

router.post(
  "/login",
  validate(usersPackage.validation.loginValidator),
  usersController.login
);

router.post(
  "/registration",
  validate(usersPackage.validation.registrationValidator),
  usersController.registration
);

router.put(
  "/password",
  Authenticate,
  validate(usersPackage.validation.changePasswordValidator),
  usersController.changePassword
);

export default router;
