'use strict';
// sequelize.model.js
const child_process = require('child_process');
const config = require('./db/config').mysql;

const { exec } = child_process;
const modelName = process.argv[2];
const database = {
    host: config.host,
    database: config.database,
    user: config.user,
    pass: config.password,
    port: config.port,
    config: '',
    output: './models',
    dialect: config.dialect,
    additional: '',
    tables: modelName || '',
    camel: true,
    'no-write': false,
    schema: false,
    typescript: false,
};

let connectShell = 'sequelize-auto';
for (const i in database) {
    const value = database[i];
    if (value) {
        if (value === true) {
            connectShell += ` --${i}`;
        } else {
            connectShell += ` --${i} ${value}`;
        }
    }
}
exec(connectShell, (err, stdout, stderr) => {
    console.log(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
    if (err) {
        console.log(`exec error: ${err}`);
    }
});