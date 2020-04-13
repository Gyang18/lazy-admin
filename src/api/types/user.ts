/** *********************** 用户登陆相关 start   ******************* */

export interface Login {
  token: string;
}
export interface UserInfo {
  token: string;
  userName: string;
  phone: string;
  avatar: string;
  nickName: string;
  signature: string;
  permissions: number[];
}

/** *********************** 用户登陆相关 end   ******************* */
