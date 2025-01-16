import { db } from "@/backend/db";
import { DataTypes, Model } from "sequelize";



class Service extends Model { }


Service.init({
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
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyUuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: "Service",
    tableName: "services",
    timestamps: true,
    collate: "utf8_general_ci",
});

export default Service