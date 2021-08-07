import LocaleKeys from "../../app/locales";

export default (connection, DataTypes) =>
  connection.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          args: true,
          msg: LocaleKeys.USED_EMAIL,
        },
      },
      password: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
    },
    {
      connection,
      tableName: "Users",
      schema: "public",
      timestamps: false,
      paranoid: false,
    }
  );
