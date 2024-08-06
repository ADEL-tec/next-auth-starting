import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Role = sequelize.define(
  "Role",
  {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { freezeTableName: true }
);

export default Role;
