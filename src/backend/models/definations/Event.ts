import { db } from "@/backend/db";
import { DataTypes, Model } from "sequelize";



class Event extends Model { }

Event.init({
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
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    companyUuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: "Event",
    tableName: "events",
    timestamps: true,
    collate: "utf8_general_ci"
});


export default Event