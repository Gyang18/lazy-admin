/**
 * axios request configs
 * @author yang
 * @date 2019/4/8
 * @param {String} baseURL  request url
 * @param {Object} header   request header
 * @param {Object} timeout  Timeout
 */
interface ConfigInterFace {
  baseURL: string | undefined;
  header: object;
  timeout: number;
}
const Config: ConfigInterFace = {
  baseURL: process.env.VUE_APP_BASEURL, // 请求地址
  header: { 'Content-Type': 'application/json;charset=UTF-8' },
  timeout: 600000,
};

export default Config;
