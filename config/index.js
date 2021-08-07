import Dotenv from "dotenv";

Dotenv.config();

export default Object.freeze({
  Port: process.env.PORT * 1,

  Database: {
    Host:
      process.env.NODE_ENV === "Docker"
        ? process.env.DOCKER_DATABASE_HOST
        : process.env.DATABASE_HOST,
    Port:
      process.env.NODE_ENV === "Docker"
        ? process.env.DOCKER_DATABASE_PORT * 1
        : process.env.DATABASE_PORT * 1,
    Name:
      process.env.NODE_ENV === "Docker"
        ? process.env.DOCKER_DATABASE_NAME
        : process.env.DATABASE_NAME,
    Username:
      process.env.NODE_ENV === "Docker"
        ? process.env.DOCKER_DATABASE_USERNAME
        : process.env.DATABASE_USERNAME,
    Password:
      process.env.NODE_ENV === "Docker"
        ? process.env.DOCKER_DATABASE_PASSWORD
        : process.env.DATABASE_PASSWORD,

    Dialect: "postgres",
    Pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },

  Caching: {
    Host:
      process.env.NODE_ENV === "Docker"
        ? process.env.DOCKER_CACHING_HOST
        : process.env.CACHING_HOST,
    Port:
      process.env.NODE_ENV === "Docker"
        ? process.env.DOCKER_CACHING_PORT * 1
        : process.env.CACHING_PORT * 1,
  },

  JwtSecret: process.env.JWT_SECRET,
  JwtLifeTime: process.env.JWT_LIFE_TIME,

  SMTP: {
    Host: process.env.SMTP_HOST,
    Port: process.env.SMTP_PORT * 1,
    Secure: JSON.parse(process.env.SMTP_SECURE),
    User: process.env.SMTP_USER,
    Password: process.env.SMTP_PASSWORD,
  },

  App: {
    Name: process.env.APP_NAME,
    Logo: process.env.APP_LOGO,
    Mail: process.env.APP_MAIL,
    DocPage: process.env.DOC_PAGE,
  },
});
