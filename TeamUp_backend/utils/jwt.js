require('dotenv').config();

const jwt = require('jsonwebtoken')
const responseUtil = require("./response");
const sequelize = require("../db/mysql");
const redis = require("../db/redis");
const jwtKey = process.env.JWT_SECRET;


const {sys_user, sys_role, sys_user_role, sys_menu, sys_role_menu} = require('../models/init-models')(sequelize);

const jwtSign = (data) => {
    return jwt.sign(data, jwtKey, {expiresIn: 60 * 60 * 24 * 7});
}

const jwtCheck = async (req, res, next) => {
    const token = req.headers.token;
    try {
        const {userId} = await jwt.verify(token, jwtKey);
        // 从redis查找是否有该token验证是否之前退出登录过
        const result = await redis.get('user_' + userId);
        if (!result) {
            responseUtil.error(res, '登录信息无效，请重新登录！', 10002);
            return;
        }
        // 存储用户个人信息
        req.userInfo = await sys_user.findOne({
            where: {id: userId}
        });
        // 存储用户权限
        const rawMenus = await sequelize.query(
            `SELECT m.menu
             FROM sys_user u
                      LEFT JOIN sys_user_role ur ON u.id = ur.user_id
                      LEFT JOIN sys_role r ON ur.role_id = r.id
                      LEFT JOIN sys_role_menu rm ON r.id = rm.role_id
                      LEFT JOIN sys_menu m ON rm.menu_id = m.id
             WHERE u.id = :userId`,
            {
                replacements: {userId},
                type: sequelize.QueryTypes.SELECT
            }
        );
        req.menus = rawMenus.map(menu => menu.menu);
        next();
    } catch (e) {
        responseUtil.error(res, '登录信息无效，请重新登录！', 10002);
    }
}

module.exports = {
    jwtSign,
    jwtCheck
}
