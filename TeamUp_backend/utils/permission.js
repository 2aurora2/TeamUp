const responseUtil = require("../utils/response");

/**
 * @desc 权限验证
 * @param {Authority[]} authorities 接口需要的权限
 */
const permissionCheck = (...authorities) => {
    return (req, res, next) => {
        const menus = req.menus || [];
        // 检查用户是否拥有所有所需的权限
        const hasAllPermissions = authorities.every(authority => menus.includes(authority));
        if (hasAllPermissions) {
            next();
        } else {
            responseUtil.error(res, '无权限访问', 403);
        }
    }
}

module.exports = {
    permissionCheck
};