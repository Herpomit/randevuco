import { db } from "@/backend/db";
import { DataTypes, Model } from "sequelize";



class EventEmployee extends Model { }

EventEmployee.init({
    eventUuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
    },
    employeeUuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
    }
}, {
    sequelize: db,
    modelName: "EventEmployee",
    tableName: "event_employees",
    timestamps: true,
    collate: "utf8_general_ci"
})

export default EventEmployee