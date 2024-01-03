let { sequelizeCon, Model, DataTypes } = require("../init/dbconfig");
class Permission extends Model {}
Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "permission",
    modelName: "Permission",
    sequelize: sequelizeCon,
  }
  );
  
  
  sequelizeCon.sync({ alter: true });
  console.log("hello world line 35")
module.exports = {
  Permission,
};
