/**
 * @Description: 商品分类接口
 * @author yang
 * @date 2020/1/30
 */
import http from '@/plugins/axios';
import { GoodsCategoryList } from '@/api/types';

// 获取商品分类
export function getGoodsCategoryResult() {
  return http<GoodsCategoryList>({
    api: '/goods/category',
    method: 'GET',
  });
}
