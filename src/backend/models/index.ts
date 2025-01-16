import Company from "./definations/Company";
import Service from "./definations/Service";
import User from "./definations/User";

export { User, Company, Service };

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

// OfficeUser.hasMany(DiscountCode, {
//     foreignKey: "addedBy",
//     sourceKey: "uuid",
//     as: "discountCodes",
//   });

//   DiscountCode.belongsTo(OfficeUser, {
//     foreignKey: "addedBy",
//     targetKey: "uuid",
//     as: "officeUser",
//   });
