/**
 * 解决webstrom 无法识别vue中@等符号， 如不使用webstorm可删除
 * @author yang
 * @date 2019/4/8
 */


// eslint-disable-next-line import/no-extraneous-dependencies
const webpackConfig = require('@vue/cli-service/webpack.config.js');

module.exports = webpackConfig;
