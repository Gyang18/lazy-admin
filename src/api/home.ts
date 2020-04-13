/**
 * @Description: 首页模块接口
 * @author yang
 * @date 2020/1/30
 */
import http from '@/plugins/axios';
import { HomeData, RecommendGoodsList } from '@/api/types/home';

// 获取首页数据
export function getHomeResult() {
  return http<HomeData>({
    api: '/home/data',
    method: 'GET',
  });
}
// 获取推荐商品
export function getHomeRecommendResult() {
  return http<RecommendGoodsList>({
    api: '/home/recommend/goods',
    method: 'GET',
  });
}
