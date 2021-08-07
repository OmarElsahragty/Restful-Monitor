import Sequelize from "sequelize";
import connection from "./Connection";
import * as Models from "../models";

const Users = Models.Users(connection, Sequelize.DataTypes);

const Database = {
  connection,

  Users,
};

export default Database;
