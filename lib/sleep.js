/**
 * sleep 函数
 * @Author: maple
 * @Date: 2020-09-03 23:01:57
 * @LastEditors: maple
 * @LastEditTime: 2020-09-04 09:11:49
 */
module.exports = function (ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
};
