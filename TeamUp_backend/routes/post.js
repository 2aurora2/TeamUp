require('dotenv').config();
var express = require('express');
var router = express.Router();

const responseUtil = require("../utils/response");
const {textCensor} = require("../utils/text");
const {jwtCheck} = require("../utils/jwt");
const {permissionCheck} = require("../utils/permission");
const {Authority} = require("../enum");
const sequelize = require("../db/mysql");
const {Sequelize} = require("sequelize");
const {post, user_like_post} = require('../models/init-models')(sequelize)

const getErrMsg = (subType) => {
    switch (subType) {
        case 1:
            return '发布失败，内容含有违禁违规内容！';
        case 2:
            return '发布失败，内容含有违规色情内容！';
        case 4:
            return '发布失败，内容含有恶意推广内容！';
        case 5:
            return '发布失败，内容含有低俗辱骂内容！';
        default:
            return '发布失败，内容含有不合规内容！';
    }
}

/**
 * @desc 用户发布帖子
 * @property {string} title
 * @property {number} type 0代表招募帖子 1代表经验帖子
 * @property {string} content
 */
router.post('/create', jwtCheck, permissionCheck(Authority.SYS_CREATE_POST), async (req, res) => {
    const {title, type, content} = req.body;
    if (title === '' || content === '') {
        responseUtil.error(res, '请确保填写信息不为空！');
        return;
    }
    const textCensorResult = await textCensor(content);
    if (textCensorResult === null || textCensorResult['conclusionType'] === 4) {
        responseUtil.error(res, '帖子发布失败，请稍后重试！');
        return;
    }
    let flag = textCensorResult['conclusionType'] === 1;
    if (flag) {
        // 审核通过
        try {
            const new_post_item = await post.create({
                user_id: req.userInfo.id,
                title: title,
                type: type,
                content: content,
                create_time: new Date().toLocaleString()
            });
            responseUtil.success(res, {
                post: new_post_item
            }, '帖子发布成功！')
        } catch (e) {
            console.log(e)
            responseUtil.error(res, '帖子发布失败，请稍后重试！')
        }
    } else {
        // 审核不通过
        const subType = textCensorResult['data'][0]['subType'];
        responseUtil.error(res, getErrMsg(subType));
    }
})

/**
 * @desc 获取postId对应帖子的内容
 */
router.get('/get/info', jwtCheck, permissionCheck(Authority.SYS_GET_POST_DETAILS), async (req, res) => {
    const {postId} = req.query;
    try {
        const post_item = await post.findOne({
            where: {
                id: postId,
                is_delete: 0
            }
        })
        if (post_item) {
            responseUtil.success(res, {
                post: post_item
            }, '获取帖子内容成功！')
        } else responseUtil.error(res, '获取帖子内容失败！');
    } catch (e) {
        responseUtil.error(res, '获取帖子内容失败');
    }
})

/**
 * @desc 点赞postId对应帖子
 * @property {number} postId
 */
router.post('/like', jwtCheck, permissionCheck(Authority.SYS_LIKE_POST), async (req, res) => {
    // 在user_like_post表查询是否有该用户与该post的记录
    // 若有且is_cancel为0则提示“请勿重复点赞”
    // 若有且is_cancel为1则修改is_cancel的值为0
    // 若没有则该表新增记录
    const userId = req.userInfo.id;
    const {postId} = req.body;
    try {
        const item = await user_like_post.findOne({
            where: {
                user_id: userId,
                post_id: postId
            }
        })
        if (item) {
            // 有相关记录但已取消点赞
            if (item.is_cancel) {
                await user_like_post.update({
                    is_cancel: 0
                }, {
                    where: {
                        user_id: userId,
                        post_id: postId
                    }
                });
                await post.increment({
                    like_count: 1
                }, {where: {id: postId}});
                responseUtil.success(res, null, '点赞成功！');
            } else responseUtil.error(res, '请勿重复点赞!');
        } else {
            // 没有相关记录则新增
            await user_like_post.create({
                user_id: userId,
                post_id: postId
            });
            await post.increment({
                like_count: 1
            }, {where: {id: postId}});
            responseUtil.success(res, null, '点赞成功！');
        }
    } catch (e) {
        responseUtil.error(res, '点赞失败！');
    }
})


/**
 * @desc 取消点赞postId对应帖子
 * @property {number} postId
 */
router.post('/unlike', jwtCheck, permissionCheck(Authority.SYS_UNLIKE_POST), async (req, res) => {
    // 在user_like_post表查询是否有该用户与该post的记录
    // 若有且is_cancel为1则提示“已取消点赞”
    // 若有且is_cancel为0则修改is_cancel的值为1
    // 若没有则提示“未点赞”
    const userId = req.userInfo.id;
    const {postId} = req.body;
    try {
        const item = await user_like_post.findOne({
            where: {
                user_id: userId,
                post_id: postId
            }
        })
        if (item) {
            // 有相关记录但已取消点赞
            if (!item.is_cancel) {
                await user_like_post.update({
                    is_cancel: 1
                }, {
                    where: {
                        user_id: userId,
                        post_id: postId
                    }
                });
                await post.decrement({
                    like_count: 1
                }, {where: {id: postId}});
                responseUtil.success(res, null, '取消点赞成功！');
            } else responseUtil.error(res, '您已经取消点赞!');
        } else {
            // 没有相关记录则提示未点赞
            responseUtil.error(res, '您未点赞该帖子！');
        }
    } catch (e) {
        responseUtil.error(res, '取消点赞失败！');
    }
})

/**
 * @desc 获取某个用户是否点赞过某个帖子
 */
router.get('/get/user/like', jwtCheck, permissionCheck(Authority.SYS_GET_IS_LIKE_POST), async (req, res) => {
    const {userId, postId} = req.query;
    try {
        const item = await user_like_post.findOne({
            where: {
                user_id: userId,
                post_id: postId
            }
        })
        if (item && !item.is_cancel) responseUtil.success(res, {like: 1}, '获取点赞状态成功！');
        else responseUtil.success(res, {like: 0}, '获取点赞状态成功！');
    } catch (e) {
        responseUtil.error(res, '获取点赞状态失败！');
    }
})

/**
 * @desc 获取符合条件的招募/经验帖子列表
 */
router.get('/get/list', jwtCheck, permissionCheck(Authority.SYS_GET_PUBLIC_POST_LIST), async (req, res) => {
    const {key, page, pageSize, sort, type} = req.query;
    try {
        // 构造查询条件
        let where = {
            is_delete: 0,
            type: Number(type)
        };
        if (key) where['content'] = {[Sequelize.Op.like]: `%${key}%`};
        // 构造排序条件
        let order;
        if (sort === 'time') order = [['create_time', 'DESC']];
        else order = [['like_count', 'DESC']];
        // 查询
        const posts = await post.findAll({
            where: where,
            order: order,
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize)
        });
        const total = await post.count({
            where: where
        });
        responseUtil.success(res, {
            postList: posts,
            total: total
        }, '获取列表成功')
    } catch (e) {
        responseUtil.error(res, '查询失败！');
    }
})

/**
 * @decs 删除自己发布的帖子
 * @property {number} postId
 */
router.post('/del/own', jwtCheck, permissionCheck(Authority.SYS_DEL_OWN_POST), async (req, res) => {
    // 根据postId查询用户是否发布过该帖子
    // 若没有则提示“删除失败”
    // 若有且已删除则提示“请勿重复删除”
    // 若有且没删除则修改is_delete为1
    const {postId} = req.body;
    const userId = req.userInfo.id;
    try {
        const item = await post.findOne({
            where: {
                id: Number(postId),
                user_id: userId
            }
        })
        if (item) {
            if (item.is_delete) responseUtil.error(res, '请勿重复删除！');
            else {
                await post.update({
                    is_delete: 1
                }, {where: {id: Number(postId)}})
                responseUtil.success(res, null, '删除成功！');
            }
        } else responseUtil.error(res, '删除失败！');
    } catch (e) {
        responseUtil.error(res, '删除失败，请稍后重试！');
    }
})

/**
 * @desc 删除某个公开帖子
 * @property {number} userId
 * @property {number} postId
 */
router.post('/del/public', jwtCheck, permissionCheck(Authority.SYS_DEL_PUBLIC_POST), async (req, res) => {
    // 根据userId和postId查询是否有对应帖子记录
    // 若没有则提示“帖子不存在”
    // 若有且已删除则提示“请勿重复删除”
    // 若有且未删除则修改is_delete为1
    const {postId, userId} = req.body;
    try {
        const item = await post.findOne({
            where: {
                id: Number(postId),
                user_id: Number(userId)
            }
        })
        if (item) {
            if (item.is_delete) responseUtil.error(res, '请勿重复删除！');
            else {
                await post.update({
                    is_delete: 1
                }, {where: {id: Number(postId)}})
                responseUtil.success(res, null, '删除成功！');
            }
        } else responseUtil.error(res, '帖子不存在，删除失败！');
    } catch (e) {
        responseUtil.error(res, '删除失败，请稍后重试！');
    }
})

/**
 * @desc 更新自己的帖子
 * @property {number} postId
 * @property {string} title
 * @property {number} type 0代表招募帖子 1代表经验帖子
 * @property {string} content
 */
router.post('/update/own', jwtCheck, permissionCheck(Authority.SYS_UPDATE_OWN_POST), async (req, res) => {
    // 根据userId和postId查询是否有对应帖子记录，保证帖子没有被删除
    // 若没有则提示“帖子不存在，更新失败！”
    // 若有则更新帖子
    const {postId, title, type, content} = req.body;
    const userId = req.userInfo.id;
    if (title === '' || content === '') {
        responseUtil.error(res, '请确保填写信息不为空！');
        return;
    }
    const textCensorResult = await textCensor(content);
    if (textCensorResult === null || textCensorResult['conclusionType'] === 4) {
        responseUtil.error(res, '帖子更新失败，请稍后重试！');
        return;
    }
    let flag = textCensorResult['conclusionType'] === 1;
    if (flag) {
        // 审核通过
        try {
            const item = await post.findOne({
                where: {
                    id: Number(postId),
                    user_id: userId,
                    is_delete: 0
                }
            });
            if (item) {
                await post.update({
                    title: title,
                    type: Number(type),
                    content: content
                }, {
                    where: {id: Number(postId)}
                })
                responseUtil.success(res, null, '更新成功！');
            } else responseUtil.error(res, '帖子不存在，更新失败！');
        } catch (e) {
            responseUtil.error(res, '更新失败，请稍后重试！');
        }
    } else {
        // 审核不通过
        const subType = textCensorResult['data'][0]['subType'];
        responseUtil.error(res, getErrMsg(subType));
    }
})

/**
 * @desc 获取所有未删除的帖子
 */
router.get('/get/all', jwtCheck, permissionCheck(Authority.SYS_GET_ALL_POST), async (req, res) => {
    const {page, pageSize} = req.query;
    try {
        const posts = await post.findAll({
            where: {is_delete: 0},
            order: [['create_time', 'DESC']],
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize)
        });
        const total = await post.count({
            where: {is_delete: 0}
        });
        responseUtil.success(res, {
            postList: posts,
            total: total
        }, '获取列表成功')
    } catch (e) {
        responseUtil.error(res, '获取列表失败！');
    }
})

module.exports = router;