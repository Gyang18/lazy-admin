/**
 * @Description: 管理用户相关
 * @author yang
 * @date 2019-08-05
 */
import http from '@/plugins/axios';
import { Login, UserInfo } from './types/user';

export function userLogin(params: {}) {
  return http<Login>({
    api: '/user/login',
    method: 'post',
    params,
  });
}
// 用户退出登陆
export function userLoginOut() {
  return http({
    api: '/user/loginout',
    method: 'delete',
  });
}
// 管理用户资料
export function userInfo() {
  return http<UserInfo>({
    api: '/user/info',
    method: 'get',
  });
}
