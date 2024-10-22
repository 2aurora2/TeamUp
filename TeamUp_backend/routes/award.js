var express = require('express');
var router = express.Router();

const sequelize = require('../db/mysql')
const {jwtCheck} = require("../utils/jwt");
const responseUtil = require("../utils/response");
const {permissionCheck} = require("../utils/permission");
const {Authority} = require("../enum");
const {award} = require('../models/init-models')(sequelize)

/**
 * @desc 用户新增获奖记录
 * @property {string} title
 * @property {string} prize
 * @property {string} date
 * @property {string} proof
 */
router.post('/add', jwtCheck, permissionCheck(Authority.SYS_ADD_AWARD_ITEM), async (req, res, next) => {
    const userId = req.userInfo.id;
    const award_item = req.body;
    try {
        const new_award_item = await award.create({
            user_id: userId,
            title: award_item.title,
            prize: award_item.prize,
            date: award_item.date,
            proof: award_item.proof
        });
        responseUtil.success(res, null, '添加获奖记录成功！');
    } catch (e) {
        responseUtil.error(res, '添加获奖记录失败！');
    }
})

/**
 * @desc 用户删除获奖记录
 * @property {number} awardId
 */
router.post('/del', jwtCheck, permissionCheck(Authority.SYS_DEL_AWARD_ITEM), async (req, res, next) => {
    const userId = req.userInfo.id;
    const awardId = req.body.awardId;
    try {
        await award.update({
            is_delete: 1
        }, {
            where: {
                id: awardId,
                user_id: userId
            }
        });
        responseUtil.success(res, null, '删除获奖记录成功！');
    } catch (e) {
        responseUtil.error(res, '删除获奖记录失败！');
    }
})

/**
 * @desc 获取用户获奖记录
 */
router.get('/get/all', jwtCheck, permissionCheck(Authority.SYS_GET_USER_AWARDS), async (req, res, next) => {
    const {userId, page, pageSize} = req.query;
    try {
        const awards = await award.findAll({
            order: [['date', 'DESC']],
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize),
            where: {
                user_id: Number(userId),
                is_delete: 0
            }
        });
        const total = await award.count({
            where: {
                user_id: Number(userId),
                is_delete: 0
            }
        })
        responseUtil.success(res, {awardList: awards, total: total}, '获取获奖记录成功！');
    } catch (e) {
        responseUtil.error(res, '获取获奖记录失败！');
    }
})

module.exports = router;
