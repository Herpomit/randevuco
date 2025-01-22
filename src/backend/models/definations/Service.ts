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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    companyUuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    showOnline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    acceptPayment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    paymentType: {
        type: DataTypes.ENUM("full", "partial"),
        allowNull: false,
        defaultValue: "full",
    },
    partialAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    }
}, {
    sequelize: db,
    modelName: "Service",
    tableName: "services",
    timestamps: true,
    collate: "utf8_general_ci",
});

export default Service