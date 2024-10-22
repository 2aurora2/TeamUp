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

/**
 * @desc 查询所有未被封禁的用户
 */
router.get('/get/all', jwtCheck, permissionCheck(Authority.SYS_GET_ALL_USER), async (req, res) => {
    const {page, pageSize} = req.query;
    try {
        const users = await sys_user.findAll({
            where: {is_banned: 0},
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize)
        });
        const total = await sys_user.count({
            where: {is_banned: 0}
        });
        responseUtil.success(res, {
            userList: users,
            total: total
        }, '获取列表成功')
    } catch (e) {
        responseUtil.error(res, '获取列表失败！');
    }
})


/**
 * @desc 封禁某个用户
 * @property {number} userId
 */
router.post('/ban', jwtCheck, permissionCheck(Authority.SYS_BAN_USER), async (req, res) => {
    const {userId} = req.body;
    const operatorId = req.userInfo.id;
    try {
        const item = await sys_user.findOne({
            where: {id: userId}
        })
        if (item) {
            if (item.is_banned) responseUtil.error(res, '该用户已被封禁！');
            else {
                // 查询被封禁用户与操作用户的角色信息
                let targetUserRoles = await sys_user_role.findAll({
                    where: {user_id: item.id},
                    mapToModel: sys_user_role
                })
                let operatorRoles = await sys_user_role.findAll({
                    where: {user_id: operatorId},
                    mapToModel: sys_user_role
                })
                targetUserRoles = targetUserRoles.map(role => role.role_id);
                operatorRoles = operatorRoles.map(role => role.role_id);
                if (targetUserRoles.includes(1) && !operatorRoles.includes(1)) {
                    responseUtil.error(res, '无权限封禁，请联系超级管理员！');
                    return;
                } else if (targetUserRoles.includes(2) && !operatorRoles.includes(1)) {
                    responseUtil.error(res, '无权限封禁，请联系超级管理员！');
                    return;
                }

                await sys_user.update({
                    is_banned: 1
                }, {where: {id: userId}})
                responseUtil.success(res, null, '封禁成功！');
            }
        } else responseUtil.error(res, '用户不存在，操作失败！');
    } catch (e) {
        responseUtil.error(res, '操作失败，请稍后重试！');
    }
})


module.exports = router;
