import Company from "./definations/Company";
import Employee from "./definations/Employee";
import Service from "./definations/Service";
import User from "./definations/User";
import EventEmployee from "./relationships/EventEmployee";
import ServiceEmployee from "./relationships/ServiceEmployee";
import Event from "./definations/Event";
import EmployeeWorkSchedule from "./definations/EmployeeWorkSchedule";

export { User, Company, Service, Employee, Event, ServiceEmployee, EventEmployee, EmployeeWorkSchedule };

User.hasOne(Company, {
  foreignKey: "userUuid",
  sourceKey: "uuid",
  as: "companies",
});

Company.belongsTo(User, {
  foreignKey: "userUuid",
  targetKey: "uuid",
  as: "user",
});

Company.hasMany(Service, {
  foreignKey: "companyUuid",
  sourceKey: "uuid",
  as: "services",
});

Service.belongsTo(Company, {
  foreignKey: "companyUuid",
  targetKey: "uuid",
  as: "company",
});

Company.hasMany(Employee, {
  foreignKey: "companyUuid",
  sourceKey: "uuid",
  as: "employees",
});

Employee.belongsTo(Company, {
  foreignKey: "companyUuid",
  targetKey: "uuid",
  as: "company",
});

Company.hasMany(Event, {
  foreignKey: "companyUuid",
  sourceKey: "uuid",
  as: "events",
});

Event.belongsTo(Company, {
  foreignKey: "companyUuid",
  targetKey: "uuid",
  as: "company",
});

Service.belongsToMany(Employee, {
  through: ServiceEmployee,
  foreignKey: "serviceUuid",
  otherKey: "employeeUuid",
  as: "employees",
});

Employee.belongsToMany(Service, {
  through: ServiceEmployee,
  foreignKey: "employeeUuid",
  otherKey: "serviceUuid",
  as: "services",
});

Event.belongsToMany(Employee, {
  through: EventEmployee,
  foreignKey: "eventUuid",
  otherKey: "employeeUuid",
  as: "employees",
});

Employee.belongsToMany(Event, {
  through: EventEmployee,
  foreignKey: "employeeUuid",
  otherKey: "eventUuid",
  as: "events",
});

Employee.hasMany(EmployeeWorkSchedule, {
  foreignKey: "employeeUuid",
  sourceKey: "uuid",
  as: "workSchedules",
});

EmployeeWorkSchedule.belongsTo(Employee, {
  foreignKey: "employeeUuid",
  targetKey: "uuid",
  as: "employee",
});


