var express = require('express');
var router = express.Router();

const sequelize = require('../db/mysql');
const responseUtil = require("../utils/response");
const {jwtSign, jwtCheck} = require("../utils/jwt");
const {sys_user, sys_user_role} = require('../models/init-models')(sequelize);
const bcrypt = require("bcrypt");
const redis = require("../db/redis");
const {permissionCheck} = require("../utils/permission");
const {Authority} = require("../enum");

/**
 * @desc 用户注册
 * @typedef {Object} RegisterRequestBody
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 * @property {string} school
 * @property {string} grade
 */
router.post('/register', async (req, res, next) => {
    const user = req.body;
    // 验证用户是否已经存在
    const exist = await sys_user.findAll({
        where: {
            email: user.email
        }
    });
    if (exist.length !== 0) {
        responseUtil.error(res, '当前邮箱已被注册，请重试！');
        return;
    }
    // 验证两次密码是否相同
    if (user.password !== user.confirmPassword) {
        responseUtil.error(res, '两次输入的密码不一致，请重试！');
        return;
    }
    const hashPwd = bcrypt.hashSync(user.password, 10);
    try {
        // 创建用户
        const new_user = await sys_user.create({
            username: user.username,
            password: hashPwd,
            email: user.email,
            major: user.major,
            grade: user.grade
        });
        // 分配角色
        const new_user_role = await sys_user_role.create({
            user_id: new_user.id,
            role_id: 3
        });
        responseUtil.success(res, {
            user: new_user
        }, '注册成功！');
    } catch (e) {
        responseUtil.error(res, '注册失败，请稍后重试！' + e);
    }
});

/**
 * @desc 用户登录
 * @typedef {Object} LoginRequestBody
 * @property {string} email
 * @property {string} password
 */
router.post('/login', async (req, res, next) => {
    const {email, password} = req.body;
    if (email && password) {
        try {
            const user = await sys_user.findOne({
                where: {
                    email: email
                }
            });
            if (user) {
                // 验证用户是否被封禁
                if (user.is_banned) {
                    responseUtil.error(res, '该账号已被封禁，请联系管理员！', 403);
                    return;
                }
                // 验证密码是否正确
                const isPwdValid = bcrypt.compareSync(password, user.password);
                if (isPwdValid) {
                    // 生成token
                    const token = jwtSign({userId: user.id});
                    // 查询用户角色
                    const roles = await sys_user_role.findAll({
                        where: {
                            user_id: user.id
                        },
                        mapToModel: sys_user_role
                    });
                    // 存储token到redis
                    redis.set('user_' + user.id, token);
                    responseUtil.success(res, {
                        user: user,
                        token: token,
                        roleList: roles.map(role => role.role_id)
                    }, '登录成功！');
                } else responseUtil.error(res, '请检查邮箱或者密码是否有误！');
            } else responseUtil.error(res, '请检查邮箱或者密码是否有误！');
        } catch (e) {
            responseUtil.error(res, '请检查邮箱或者密码是否有误！');
        }
    } else responseUtil.error(res, '输入信息不能为空');
})

/**
 * @desc 退出登录
 */
router.post('/logout', jwtCheck, permissionCheck(Authority.SYS_LOGOUT), async (req, res, next) => {
    try {
        const result = await redis.del('user_' + req.userInfo.id);
        responseUtil.success(res, null, '退出登录成功！');
    } catch (e) {
        responseUtil.error(res, '退出登录失败，请稍后重试！' + e);
    }
})

module.exports = router;
