import { db } from "@/backend/db";
import { DataTypes, Model } from "sequelize";

class EmployeeWorkSchedule extends Model { }

EmployeeWorkSchedule.init(
    {
        uuid: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        employeeUuid: {
            type: DataTypes.CHAR(36),
            allowNull: false,
        },
        day: {
            type: DataTypes.STRING, // "Monday", "Tuesday", etc.
            allowNull: false,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        isWorking: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: "EmployeeWorkSchedule",
        tableName: "employee_work_schedules",
        timestamps: true,
        collate: "utf8_general_ci",
    }
);

export default EmployeeWorkSchedule