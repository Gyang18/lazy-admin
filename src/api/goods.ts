/**
 * @Description: 商品相关接口
 * @author yang
 * @date 2020/1/30
 */
import http from '@/plugins/axios';
import { GoodsCategoryList, GoodsCartList } from '@/api/types';

// 获取商品分类
export function getGoodsCategoryResult() {
  return http<GoodsCategoryList>({
    api: '/goods/category',
    method: 'GET',
  });
}
// 商品购物车列表
export function getGoodsCartResult() {
  return http<GoodsCartList>({
    api: '/goods/cart',
    method: 'GET',
  });
}
