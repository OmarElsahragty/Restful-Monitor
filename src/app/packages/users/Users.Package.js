import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendPassCodeMail } from "../../../services";
import Database from "../../../database";
import { Protocols, PasswordGenerator } from "../../helpers";
import Config from "../../../../config";
import LocaleKeys from "../../locales";

// **==========================================================================
// **                              Users
// **==========================================================================

export const checkUser = async (id = null, email = null) => {
  try {
    const user = await Database.Users.findOne({
      where: { id, email },
      attributes: ["id"],
    });

    return Protocols.appResponse({ data: !!user });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const create = async ({ email }) => {
  const GeneratedPassword = PasswordGenerator();
  const password = bcrypt.hashSync(GeneratedPassword, 10);

  try {
    const createdUser = await Database.Users.create({ email, password });

    await sendPassCodeMail(
      createdUser.email,
      "Account Creation",
      "To login, please use the following Password",
      GeneratedPassword
    );

    return Protocols.appResponse({ data: { email: createdUser.email } });
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const authenticate = async ({ email, password }) => {
  try {
    const user = await Database.Users.findOne({
      where: {
        email,
      },
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        Config.JwtSecret,
        {
          expiresIn: Config.JwtLifeTime,
        }
      );

      return Protocols.appResponse({ data: { email: user.email, token } });
    } else {
      return Protocols.appResponse({ err: LocaleKeys.WRONG_CREDENTIALS });
    }
  } catch (err) {
    return Protocols.appResponse({ err });
  }
};

export const changePassword = async ({ oldPassword, newPassword }, userId) => {
  try {
    const user = await Database.Users.findByPk(userId);

    if (user && bcrypt.compareSync(oldPassword, user.password)) {
      user.password = bcrypt.hashSync(newPassword, 10);

      await user.save();

      return Protocols.appResponse({ data: { email: user.email } });
    } else {
      return Protocols.appResponse({ err: LocaleKeys.WRONG_CREDENTIALS });
    }
  } catch (err) {
    console.error(err);
    return Protocols.appResponse({ err });
  }
};
