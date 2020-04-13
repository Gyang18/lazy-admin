/**
 * 项目全局设置
 * @param { string } title 项目名称、标题
 * @param { string } logo 项目logo
 * @param { boolean } auth 是否开启权限校验
 * @param { string } apiDev 开发接口地址(不能为空)
 * @param { string } apiTest 测试接口地址(不能为空)
 * @param { string } api 生产接口地址(不能为空)
 */

module.exports = {
  title: 'yang-shop',
  logo: '',
  auth: false,
  apiDev: 'http://yapi.gyang.live/mock/15/api-app',
  apiTest: 'http://api.test',
  api: 'http://api',
};
