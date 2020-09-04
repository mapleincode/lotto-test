/**
 * @Author: maple
 * @Date: 2020-09-03 01:12:20
 * @LastEditors: maple
 * @LastEditTime: 2020-09-04 10:35:10
 */
const fs = require('fs');
const countries = require('./lib/countries_get');
const config = require('./config/config.json');
const sleep = require('./lib/sleep');
const appendFile = require('./lib/append_file');
const path = require('path');

const {
  defaultPath
} = config;

async function main () {
  const totals = [];
  for (const country of countries) {
    const filePath = path.join(__dirname, defaultPath, 'crawler', country);
    try {
      fs.statSync(path.join(filePath, 'index.js'));
    } catch (err) {
      console.error(`lottery country ${country} is not exist!`);
      continue;
    }
    const countrySet = require(filePath);
    for (const [name, crawls] of countrySet) {
      totals.push([name, crawls[0].crawl]);
      console.log(`crawler ${name} added!`);
    }
  }

  while (true) {
    for (const [name, crawl] of totals) {
      await sleep(1000 * 600);
      console.log(`crawl ${name} begin crawl!`);
      let result;
      try {
        result = await crawl();
      } catch (err) {
        console.error(`crawl ${name} crawl failed!`, err);
        await appendFile.writeEvent('ERROR', name, err);
        continue;
      }

      await appendFile.writeData(name, result);
    }
  }
}

main();
