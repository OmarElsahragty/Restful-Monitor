import NodeMailer from "nodemailer";
import { passCodeMailTemplate, upDownMailTemplate } from "../utilities";
import Config from "../../config";

export default async function sendMail(data) {
  const transporter = NodeMailer.createTransport({
    host: Config.SMTP.Host,
    port: Config.SMTP.Port,
    secure: Config.SMTP.Secure,
    auth: {
      user: Config.SMTP.User,
      pass: Config.SMTP.Password,
    },
  });

  await transporter.sendMail(data);
}

export const sendPassCodeMail = (sendTo, subject, message, passCode) =>
  sendMail({
    from: Config.App.Mail,
    to: sendTo,
    subject: `${Config.App.Name} ${subject}`,
    html: passCodeMailTemplate(subject, message, passCode),
  });

export const sendUpDownMail = (sendTo, subject, website, message) =>
  sendMail({
    from: Config.App.Mail,
    to: sendTo,
    subject: `${Config.App.Name} ${subject}`,
    html: upDownMailTemplate(subject, website, message),
  });
