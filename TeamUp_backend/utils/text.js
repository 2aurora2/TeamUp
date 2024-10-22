// 使用第三方服务——百度智能云的文本审核服务：https://cloud.baidu.com/doc/ANTIPORN/s/Vk3h6xaga

// 1. 接口地址：https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined
// 2. url参数：access_token
// 3. header: { Content-Type: application/x-www-form-urlencoded }
// 4. body: { text: 【待审核文本字符串】 }


require('dotenv').config();
const axios = require('axios');

// ACCESS_TOKEN有过期时间，过期后需要重新重新获取
// ACCESS_TOKEN获取方式：https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjhhu
async function getAccessToken() {
    const url = 'https://aip.baidubce.com/oauth/2.0/token';
    const grant_type = 'client_credentials';
    const client_id = process.env.BAIDU_CLIENT_ID;
    const client_secret = process.env.BAIDU_CLIENT_SECRET;

    const code = await axios.get(url + '?grant_type=' + grant_type + '&client_id=' + client_id + '&client_secret=' + client_secret)
    return code['data']['access_token'];
}

// 文本审核
async function textCensor(text) {
    // 这里为了方便就直接每次获取，后续看看再改改
    const ACCESS_TOKEN = await getAccessToken();
    if (!ACCESS_TOKEN) {
        return null;   // null代表审核失败
    }
    try {
        const result = await axios.request({
            url: 'https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                access_token: ACCESS_TOKEN
            },
            data: {
                text: text
            }
        })
        // result详细字段参考：https://cloud.baidu.com/doc/ANTIPORN/s/Nk3h6xbb2#%E5%A4%B1%E8%B4%A5%E5%93%8D%E5%BA%94%E7%A4%BA%E4%BE%8B
        if (result['data']['error_code']) return null;
        return result['data'];
    } catch (e) {
        return null;
    }
}

module.exports = {
    textCensor
};