var DataTypes = require("sequelize").DataTypes;
var _award = require("./award");
var _sys_menu = require("./sys_menu");
var _sys_role = require("./sys_role");
var _sys_role_menu = require("./sys_role_menu");
var _sys_user = require("./sys_user");
var _sys_user_role = require("./sys_user_role");

function initModels(sequelize) {
  var award = _award(sequelize, DataTypes);
  var sys_menu = _sys_menu(sequelize, DataTypes);
  var sys_role = _sys_role(sequelize, DataTypes);
  var sys_role_menu = _sys_role_menu(sequelize, DataTypes);
  var sys_user = _sys_user(sequelize, DataTypes);
  var sys_user_role = _sys_user_role(sequelize, DataTypes);

  sys_role_menu.belongsTo(sys_menu, { as: "menu", foreignKey: "menu_id"});
  sys_menu.hasMany(sys_role_menu, { as: "sys_role_menus", foreignKey: "menu_id"});
  sys_role_menu.belongsTo(sys_role, { as: "role", foreignKey: "role_id"});
  sys_role.hasMany(sys_role_menu, { as: "sys_role_menus", foreignKey: "role_id"});
  sys_user_role.belongsTo(sys_role, { as: "role", foreignKey: "role_id"});
  sys_role.hasMany(sys_user_role, { as: "sys_user_roles", foreignKey: "role_id"});
  award.belongsTo(sys_user, { as: "user", foreignKey: "user_id"});
  sys_user.hasMany(award, { as: "awards", foreignKey: "user_id"});
  sys_user_role.belongsTo(sys_user, { as: "user", foreignKey: "user_id"});
  sys_user.hasMany(sys_user_role, { as: "sys_user_roles", foreignKey: "user_id"});

  return {
    award,
    sys_menu,
    sys_role,
    sys_role_menu,
    sys_user,
    sys_user_role,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
