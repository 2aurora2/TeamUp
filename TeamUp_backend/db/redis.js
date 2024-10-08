const redis = require('redis')
const config = require('./config').redis;

// 创建连接终端
const redisClient = redis.createClient(config.port, config.host);

// 监听存储过程出错
redisClient.on('error', err => {
    console.log(err)
})

// 存储值
function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

// 读取值
function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            // 出错
            if (err) {
                reject(err);
                return;
            }
            // 值为空
            if (val == null) {
                resolve(null);
                return;
            }
            // 如果是json则转为对象，否则直接返回设置的值
            try {
                resolve(JSON.parse(val));
            } catch (ex) {
                resolve(val);
            }
        })
    })
}

// 删除值
function del(key) {
    return new Promise((resolve, reject) => {
        redisClient.del(key, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    set,
    get,
    del
}
