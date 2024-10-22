var express = require('express');
var router = express.Router();

const sequelize = require('../db/mysql')
const {jwtCheck} = require("../utils/jwt");
const responseUtil = require("../utils/response");
const {permissionCheck} = require("../utils/permission");
const {Authority} = require("../enum");
const {Op} = require("sequelize");
const {match, match_tag} = require('../models/init-models')(sequelize);

/**
 * @desc 添加比赛条目
 * @property {string} title
 * @property {string} link
 * @property {int} month
 * @property {string} description
 * @property {string[]} tags
 */
router.post('/add', jwtCheck, permissionCheck(Authority.SYS_ADD_MATCH_ITEM), async (req, res, next) => {
    let haveCreateMatch = false;
    let new_match_id = 0;
    try {
        const new_match = await match.create({
            title: req.body.title,
            link: req.body.link,
            month: req.body.month,
            description: req.body.description,
            is_delete: 0
        })
        haveCreateMatch = true;
        new_match_id = new_match.id;
        for (let tag of req.body.tags) {
            await match_tag.create({
                match_id: new_match.id,
                tag: tag
            })
        }
        responseUtil.success(res, null, '创建比赛条目成功！');
    } catch (e) {
        console.log(e)
        if (haveCreateMatch)
            match.update({is_delete: 1}, {
                where: {id: new_match_id}
            })
        responseUtil.error(res, '创建比赛条目失败！');
    }
})

/**
 * @desc 删除比赛条目
 * @property {number} matchId
 */
router.post('/del', jwtCheck, permissionCheck(Authority.SYS_DEL_MATCH_ITEM), async (req, res, next) => {
    try {
        await match.update({
            is_delete: 1
        }, {
            where: {
                id: req.body.matchId
            }
        });
        responseUtil.success(res, null, '删除比赛条目成功！');
    } catch (e) {
        responseUtil.error(res, '删除比赛条目失败！');
    }
})

/**
 * @desc 获取所有比赛条目
 */
router.get('/get/all', jwtCheck, permissionCheck(Authority.SYS_GET_ALL_MATCH), async (req, res, next) => {
    const {page, pageSize} = req.query;
    try {
        const matches = await match.findAll({
            order: [['month', 'ASC']],
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize),
            where: {
                is_delete: 0,
            }
        });
        const tagList = [];
        for (let match of matches) {
            const tags = await match_tag.findAll({
                where: {match_id: match.id}
            });
            tagList.push(tags.map(tag => tag.tag));
        }
        const total = await match.count({
            where: {
                is_delete: 0
            }
        });
        responseUtil.success(res, {
            matches: matches,
            tagList: tagList,
            total: total
        }, '获取比赛列表成功！');
    } catch (e) {
        responseUtil.error(res, '获取比赛列表失败！');
    }
})

/**
 * @desc 获取近期比赛条目
 */
router.get('/get/recent', async (req, res, next) => {
    const currentMonth = new Date().getMonth() + 1;
    const nextMonth = (currentMonth + 1) % 12;
    const nextNextMonth = (currentMonth + 2) % 12;
    try {
        const matches = await match.findAll({
            offset: 0,
            limit: 3,
            where: {
                is_delete: 0,
                month: {
                    [Op.or]: [
                        currentMonth, // 当前月份
                        nextMonth, // 下一个月份
                        nextNextMonth // 下下一个月
                    ]
                }
            },
            order: [['month', 'ASC']]
        });
        const tagList = [];
        for (let match of matches) {
            const tags = await match_tag.findAll({
                where: {match_id: match.id}
            });
            tagList.push(tags.map(tag => tag.tag));
        }
        responseUtil.success(res, {
            matches: matches,
            tagList: tagList
        }, '获取近期比赛成功！');
    } catch (e) {
        responseUtil.error(res, '获取近期比赛失败！');
    }
})

module.exports = router;