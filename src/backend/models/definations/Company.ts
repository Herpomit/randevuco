import { db } from "@/backend/db";
import { DataTypes, Model } from "sequelize";

class Company extends Model { }

Company.init(
  {
    uuid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_lat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_long: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userUuid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "company",
    tableName: "companies",
    timestamps: true,
    collate: "utf8_general_ci",
  }
);

export default Company;
