/**
 * number.get() 获得一个全局唯一的数字
 * @Author: maple
 * @Date: 2020-09-03 22:45:53
 * @LastEditors: maple
 * @LastEditTime: 2020-09-03 22:52:40
 */
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

let firstNumber;
try {
  firstNumber = fs.readFileSync('number.txt', { encoding: 'ascii' });
} catch (err) {

}
if (isNaN(parseInt(firstNumber))) {
  firstNumber = 0;
}

exports.get = async function () {
  firstNumber++;
  await writeFile('number.txt', firstNumber);
  return firstNumber;
};
