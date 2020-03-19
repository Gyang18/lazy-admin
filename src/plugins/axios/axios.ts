/**
 * axios interceptor configs
 * @author yang
 * @date 2019/4/9
 */
import Axios from 'axios';
import { Toast } from 'vant';
import router from '@/router';
import configs from './config';
import { getToken } from '@/helpers/auth';

Toast.setDefaultOptions({ duration: 2000 });
// axios 请求基础设置
Axios.defaults.baseURL = configs.baseURL;
Axios.defaults.timeout = configs.timeout;
Axios.defaults.headers = configs.header;
let timer:any = null;

// 跳回登陆页
function redirectLogin() {
  setTimeout(() => {
    router.push('/login');
  }, 500);
}
// 请求拦截器
Axios.interceptors.request.use(config => {
  const newConfig: any = config;
  const userToken: string | null = getToken();
  if (userToken) {
    newConfig.headers.token = userToken;
  }
  return newConfig;
});
// 响应拦截器
Axios.interceptors.response.use(response => {
  const { data } = response;
  if (typeof data === 'string') {
    Toast.fail('返回数据格式错误');
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`返回数据格式错误->${typeof data}`);
  }
  if (!data.success) {
    switch (data.code) {
      case 101:
        redirectLogin();
        break;
      default:
    }
    Toast.fail(data.msg || '未知错误');
    if (!timer) {
      timer = setTimeout(() => {
        Toast.clear();
        clearTimeout(timer);
      }, 2000);
    }
  } else {
    Toast.clear();
  }
  return data;
}, err => {
  let msg: string = '';
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        msg = '请求错误';
        break;
      case 401:
        msg = '未授权，请登录';
        break;
      case 403:
        msg = '拒绝访问';
        break;
      case 404:
        msg = `请求地址出错: ${err.response.config.url}`;
        break;
      case 408:
        msg = '请求超时';
        break;
      case 500:
        msg = '服务器内部错误';
        break;
      case 501:
        msg = '服务未实现';
        break;
      case 502:
        msg = '网关错误';
        break;
      case 503:
        msg = '服务不可用';
        break;
      case 504:
        msg = '网关超时';
        break;
      case 505:
        msg = 'HTTP版本不受支持';
        break;
      default:
        msg = '请求失败！';
    }
  }
  Toast.fail(msg);
  return Promise.reject(err);
});
export default Axios;
