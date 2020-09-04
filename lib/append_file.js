/**
 * @Author: maple
 * @Date: 2020-09-03 22:22:42
 * @LastEditors: maple
 * @LastEditTime: 2020-09-04 10:25:51
 */
const moment = require('moment');
const config = require('../config/config.json');
const fs = require('fs');
const util = require('util');
const number = require('./number');
const md5 = require('./md5');
const path = require('path');

const appendFile = util.promisify(fs.appendFile);

let {
  datasFileName,
  eventsFileName
} = config;

datasFileName = path.join(__dirname, '..', datasFileName);
eventsFileName = path.join(__dirname, '..', eventsFileName);

try {
  fs.statSync(datasFileName);
} catch (err) {
  fs.writeFileSync(datasFileName, '');
}

try {
  fs.statSync(eventsFileName);
} catch (err) {
  fs.writeFileSync(eventsFileName, '');
}

function date () {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

exports.writeData = async function (lotteryId, data) {
  const id = await number.get();
  if (typeof data === 'object') data = JSON.stringify(data);
  const msg = `${id} ${date()} ${lotteryId} ${data}\n`;
  await appendFile(datasFileName, msg);

  const value = md5.check(lotteryId, data, id);
  if (value) {
    await exports.writeEvent('DIFF_DATA_NEW', lotteryId, data, id);
    await exports.writeEvent('DIFF_DATA_OLD', lotteryId, value.data, value.id);
  }
};

exports.writeEvent = async function (event = 'ERROR', lotteryId, data, id) {
  if (event === 'ERROR') {
    if (data.stack) {
      // data = data.stack;
    }
  }
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  const msg = `${date()} ${event} ${lotteryId}${id ? ' ' + id : ''} ${data}\n`;
  await appendFile(eventsFileName, msg);
};

// async function test () {
//   // await exports.writeData('123', { aa: 'bb' });
//   // await exports.writeData('123', { aa: 'bb' });

//   // await exports.writeData('123', { aa: 'cc' });
//   const err = new Error();
//   await exports.writeEvent('ERROR', '123', err);
// }

// test()
// ;
