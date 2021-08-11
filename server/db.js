const { Sequelize, DataTypes, Model } = require("sequelize");
const path = require("path");
// if (process.env.NODE_ENV === "development") {
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
});
// } else {
//   const sequelize = new Sequelize(process.env.DATABASE_URL);
// }
class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "User" }
);
class Entries extends Model {}
Entries.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  { sequelize, modelName: "Entries" }
);
User.hasMany(Entries, {
  as: "entries",
  foreignKey: "UserId",
  onDelete: "cascade",
});
Entries.belongsTo(User, { foreignKey: "UserId" });
sequelize.sync();
module.exports = { sequelize, User, Entries };
