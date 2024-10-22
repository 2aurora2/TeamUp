var DataTypes = require("sequelize").DataTypes;
var _award = require("./award");
var _match = require("./match");
var _match_tag = require("./match_tag");
var _post = require("./post");
var _sys_menu = require("./sys_menu");
var _sys_role = require("./sys_role");
var _sys_role_menu = require("./sys_role_menu");
var _sys_user = require("./sys_user");
var _sys_user_role = require("./sys_user_role");
var _user_like_post = require("./user_like_post");

function initModels(sequelize) {
  var award = _award(sequelize, DataTypes);
  var match = _match(sequelize, DataTypes);
  var match_tag = _match_tag(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var sys_menu = _sys_menu(sequelize, DataTypes);
  var sys_role = _sys_role(sequelize, DataTypes);
  var sys_role_menu = _sys_role_menu(sequelize, DataTypes);
  var sys_user = _sys_user(sequelize, DataTypes);
  var sys_user_role = _sys_user_role(sequelize, DataTypes);
  var user_like_post = _user_like_post(sequelize, DataTypes);

  match_tag.belongsTo(match, { as: "match", foreignKey: "match_id"});
  match.hasMany(match_tag, { as: "match_tags", foreignKey: "match_id"});
  user_like_post.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(user_like_post, { as: "user_like_posts", foreignKey: "post_id"});
  sys_role_menu.belongsTo(sys_menu, { as: "menu", foreignKey: "menu_id"});
  sys_menu.hasMany(sys_role_menu, { as: "sys_role_menus", foreignKey: "menu_id"});
  sys_role_menu.belongsTo(sys_role, { as: "role", foreignKey: "role_id"});
  sys_role.hasMany(sys_role_menu, { as: "sys_role_menus", foreignKey: "role_id"});
  sys_user_role.belongsTo(sys_role, { as: "role", foreignKey: "role_id"});
  sys_role.hasMany(sys_user_role, { as: "sys_user_roles", foreignKey: "role_id"});
  award.belongsTo(sys_user, { as: "user", foreignKey: "user_id"});
  sys_user.hasMany(award, { as: "awards", foreignKey: "user_id"});
  post.belongsTo(sys_user, { as: "user", foreignKey: "user_id"});
  sys_user.hasMany(post, { as: "posts", foreignKey: "user_id"});
  sys_user_role.belongsTo(sys_user, { as: "user", foreignKey: "user_id"});
  sys_user.hasMany(sys_user_role, { as: "sys_user_roles", foreignKey: "user_id"});
  user_like_post.belongsTo(sys_user, { as: "user", foreignKey: "user_id"});
  sys_user.hasMany(user_like_post, { as: "user_like_posts", foreignKey: "user_id"});

  return {
    award,
    match,
    match_tag,
    post,
    sys_menu,
    sys_role,
    sys_role_menu,
    sys_user,
    sys_user_role,
    user_like_post,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
