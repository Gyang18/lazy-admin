import { GoodsItem } from '@/api/types/goods';
import { Pagination } from './base';

export interface BannerData {
  url: string;
  id: number;
}
export interface CategoryNavData {
  title: string;
  cover: string;
  id: number;
}
export interface HomeGoodsData extends GoodsItem {
  id: number;
}
export interface HomeData {
  banner: BannerData[];
  categoryNav: CategoryNavData[];
  categoryGoods: HomeGoodsData[];
}
export interface RecommendGoodsItem extends GoodsItem {
  id: number;
}
export interface RecommendGoodsList extends Pagination<RecommendGoodsItem> {}
