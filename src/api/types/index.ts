// 接口返回数据格式约束
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

/** *********************** 首页数据约束 start   ******************* */

export interface BannerData {
  url: string;
  id: number;
}
export interface CategoryNavData {
  title: string;
  cover: string;
  id: number;
}
export interface HomeGoodsData {
  cover: string;
  title: string;
  id: number;
  price: string;
}
export interface HomeData {
  banner: BannerData[];
  categoryNav: CategoryNavData[];
  categoryGoods: HomeGoodsData[];
  commendGoods: HomeGoodsData[];
}

/** *********************** 首页数据约束 end   ******************* */
