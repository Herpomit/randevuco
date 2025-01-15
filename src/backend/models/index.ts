import Company from "./definations/Company";
import User from "./definations/User";

export { User, Company };

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
