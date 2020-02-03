// 接口返回数据格式约束

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
export interface BannerData {
  url: string;
  id: number;
}
export type HomeBanner = BannerData[];
export interface CategoryData {
  title: string;
  cover: string;
  id: number;
}
export type HomeCategoryList = CategoryData[];
