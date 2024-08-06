import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    username: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      unique: false,
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

export default User;
