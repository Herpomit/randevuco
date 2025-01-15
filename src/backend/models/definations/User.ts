import { db } from "@/backend/db";
import { DataTypes, Model } from "sequelize";

class User extends Model {}

User.init(
  {
    uuid: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: true,
    collate: "utf8_general_ci",
  }
);

export default User;
