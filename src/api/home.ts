/**
 * @Description: 首页模块接口
 * @author yang
 * @date 2020/1/30
 */
import http from '@/plugins/axios';
import { HomeData } from '@/api/types';

// 获取首页数据
export function getHomeResult() {
  return http<HomeData>({
    api: '/home/data',
    method: 'GET',
  });
}
