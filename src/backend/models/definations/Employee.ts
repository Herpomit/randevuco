import { db } from "@/backend/db";
import { DataTypes, Model } from "sequelize";


class Employee extends Model { }


Employee.init({
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
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyUuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: "Employe",
    tableName: "employes",
    timestamps: true,
    collate: "utf8_general_ci",
});

export default Employee;