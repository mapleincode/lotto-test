<!--
 * @Author: maple
 * @Date: 2020-08-17 22:11:21
 * @LastEditors: maple
 * @LastEditTime: 2020-09-04 11:07:53
-->
# Lotto Test

检测 crawler 在不同时间段的数据变化。
默认 10 分钟运行一个 crawl。
为了省事，所有请求强制 async/await 走同步。包括日志写入。

日志会有两个文件:
- logs/datas.log
- logs/events.log

前者是数据。
后者是 Error 和数据变化。

# Usage

```sh
cp config/config.txt.example config/config.txt
vim config/config.txt
```
然后把国家代码一行一个

```sh
node index.js
```

可以使用 tmux 和 pm2

