/**
 * @Author: maple
 * @Date: 2020-09-03 01:20:15
 * @LastEditors: maple
 * @LastEditTime: 2020-09-03 01:24:38
 */
const fs = require('fs');
const configText = fs.readFileSync('./config.txt', { encoding: 'utf-8' });

const conntries = configText.trim().split('\n').map(c => c.trim()).filter(c => c);

module.exports = conntries;
