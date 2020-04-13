export interface GoodsItem {
 title: number;
 cover: string;
 price: number | string;
}
export interface GoodsCategory {
  id: number;
  pid: number;
  name: string;
  cover?: string;
  children?: GoodsCategory[];
}
export type GoodsCategoryList = GoodsCategory[];

export interface GoodsCartItem extends GoodsItem {
  id: number;
  attrVal: string;
  stock: number;
  num: number;
  checked?: boolean;
}
export type GoodsCartList = GoodsCartItem[];
