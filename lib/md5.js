/**
 * @Author: maple
 * @Date: 2020-09-03 22:55:14
 * @LastEditors: maple
 * @LastEditTime: 2020-09-04 09:39:15
 */
const crypto = require('crypto');
const datas = {};

function MD5 (str) {
  return crypto.createHash('md5').update(str).digest('base64');
}

/**
 * checkMD5
 * @param {String} lotteryID lotteryID
 * @param {object} data {} data
 * @returns {false|{}} false or { lottery, data }
 */
exports.check = function (lotteryID, data, id) {
  if (typeof data === 'object') data = JSON.stringify(data);

  const md5 = MD5(data);
  const oldData = datas[lotteryID];

  if (!oldData) {
    datas[lotteryID] = {
      id: id,
      md5: md5,
      data: data
    };
    return false;
  }

  if (oldData.md5 === md5) {
    return false;
  }

  datas[lotteryID] = {
    id: id,
    md5: md5,
    data: data
  };
  return oldData;
};
