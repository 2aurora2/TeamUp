const Sequelize = require('sequelize');
const config = require('./config').mysql;

const sequelize = new Sequelize({
    host: config.host,
    username: config.user,
    password: config.password,
    database: config.database,
    dialect: 'mysql',
    timezone: '+08:00'
});

// 测试连接
sequelize.authenticate()
    .then(() => {
        console.log('Mysql connect successfully!');
    })
    .catch(err => {
        console.log('Mysql connect failed! \n' + err)
    });

module.exports = sequelize;