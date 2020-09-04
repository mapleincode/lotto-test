/**
 * @Author: maple
 * @Date: 2020-09-03 01:20:15
 * @LastEditors: maple
 * @LastEditTime: 2020-09-04 10:10:20
 */
const fs = require('fs');
const path = require('path');

const configText = fs.readFileSync(path.join(__dirname, '../config/config.txt'), { encoding: 'utf-8' });

const conntries = configText.trim().split('\n').map(c => c.trim()).filter(c => c);

module.exports = conntries;
