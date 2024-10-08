var express = require('express');
var router = express.Router();

const sequelize = require('../db/mysql')
const {jwtCheck} = require("../utils/jwt");
const responseUtil = require("../utils/response");
const {permissionCheck} = require("../utils/permission");
const {Authority} = require("../enum");
const {sys_user, sys_user_role, award} = require('../models/init-models')(sequelize)


/**
 * @desc 修改个人信息
 * @property {string} username
 * @property {string} email
 * @property {string} major
 * @property {string} grade
 * @property {string} avatar
 */
router.post('/update/info', jwtCheck, permissionCheck(Authority.SYS_UPDATE_USER_INFO), async function (req, res, next) {
    const userId = req.userInfo.id;
    const user = req.body;
    try {
        await sys_user.update({
            username: user.username,
            email: user.email,
            major: user.major,
            grade: user.grade,
            avatar: user.avatar
        }, {where: {id: userId}});
        const new_user = await sys_user.findOne({
            where: {id: userId}
        });
        responseUtil.success(res, {
            user: new_user
        }, '更新个人信息成功！');
    } catch (e) {
        responseUtil.error(res, '更新个人信息失败，检查邮箱是否已被其他账号绑定！');
    }
});

/**
 * @desc 根据userId获取用户信息
 * @param userId 用户id
 */
router.get('/get/info', jwtCheck, permissionCheck(Authority.SYS_GET_USER_INFO), async (req, res, next) => {
    try {
        const userId = parseInt(req.query.userId, 10);
        const user = await sys_user.findOne({
            where: {id: userId, is_banned: 0}
        });
        if (user) {
            const roles = await sys_user_role.findAll({
                where: {user_id: userId}
            })
            responseUtil.success(res, {
                user: user,
                roleList: roles.map(role => role.role_id)
            }, '查询成功！');
        } else responseUtil.error(res, '查询用户失败！');
    } catch (e) {
        responseUtil.error(res, '查询用户失败！');
    }
})

module.exports = router;
