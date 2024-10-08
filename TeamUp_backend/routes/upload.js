require('dotenv').config();
var express = require('express');
var router = express.Router();

const responseUtil = require("../utils/response");
const formidable = require('formidable');
const path = require("path");
const {jwtCheck} = require("../utils/jwt");
const {permissionCheck} = require("../utils/permission");
const {Authority} = require("../enum");

/**
 * @desc 上传文件
 * @property {FormData} file
 */
router.post('/', jwtCheck, permissionCheck(Authority.SYS_UPLOAD_FILE), async (req, res) => {
    let form = formidable({
        multiple: true,
        uploadDir: path.resolve(__dirname, '../public/images'),
        keepExtensions: true
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            responseUtil.error(res, '上传失败，请稍后重试！');
            return;
        }
        responseUtil.success(res, {
            url: process.env.BASE_URL + '/images/' + files.file.newFilename
        }, '上传成功！');
    })
})

module.exports = router;