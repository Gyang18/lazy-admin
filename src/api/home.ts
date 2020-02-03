/**
 * @Description: 首页模块接口
 * @author yang
 * @date 2020/1/30
 */
import http from '@/plugins/axios';
import {HomeBanner, HomeCategoryList} from '@/api/types';

// 获取轮播图列表
export function getBanner(): Promise<any> {
  return http<HomeBanner>({
    api: '/home/banner',
    method: 'get',
  });
}

export function getHomeCategory():Promise<any> {
  return http<HomeCategoryList>({
    api: '/home/category',
    method: 'get',
  });
}
