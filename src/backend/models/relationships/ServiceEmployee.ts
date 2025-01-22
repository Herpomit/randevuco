import { db } from "@/backend/db";
import { DataTypes, Model } from "sequelize";



class ServiceEmployee extends Model { }

ServiceEmployee.init({
    serviceUuid: {
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
    modelName: "ServiceEmployee",
    tableName: "service_employees",
    timestamps: true,
    collate: "utf8_general_ci"
})

export default ServiceEmployee