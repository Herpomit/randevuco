/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, QueryTypes } from "sequelize";
import { db } from "../db";
import { Company, Employee, EmployeeWorkSchedule, Event, EventEmployee, Service, ServiceEmployee, User } from "../models";

const models = [
  {
    name: "User",
    model: User,
  },
  {
    name: "Comapny",
    model: Company,
  },
  {
    name: "Service",
    model: Service,
  },
  {
    name: "Employee",
    model: Employee,
  },
  {
    name: "Event",
    model: Event
  },
  {
    name: "EventEmployee",
    model: EventEmployee
  },
  {
    name: "ServiceEmployee",
    model: ServiceEmployee
  },
  {
    name: "EmployeeWorkSchedule",
    model: EmployeeWorkSchedule
  }
];

export const initDatabase = async () => {
  try {
    await db.authenticate();
    await db.sync({ alter: true });

    const tableCheckResults: Record<string, string> = {};
    for (const { name, model } of models) {
      const tableName = model.getTableName();
      const result = await db.query<{ count: number }>(
        `SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tableName}'`,
        { type: QueryTypes.SELECT }
      );
      const count = result[0]?.count ?? 0; // Ensure count is defined
      tableCheckResults[name] = count > 0 ? "Created" : "Not created";
    }

    return tableCheckResults;
  } catch (error: any) {
    console.error("Database initialization error:", error);
    throw new Error(error.message);
  }
};
