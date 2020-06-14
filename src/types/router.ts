export interface Router {
 path: string;
 name?: string;
 component?: any;
  redirect?: string;
 meta?: Meta;
 children?: Router[];
}

/**
 * @param { string } title 页面标题
 * @param { string } backUrl 指定返回上级页面 空则默认返回上级
 * @param { boolean } border 导航栏是否有边框，默认false
 * @param { boolean } isBackShow 导航栏是否显示返回按钮 默认true
 * @param { boolean } isShowTabbar 是否显示底部tabbar 默认false
 * @param { boolean } isShowHeader 是否显示导航栏，默认true(若设置为false，则可在页面自定义导航栏)
 * @param { string } navLeftText 导航栏左侧返回按钮文字 默认 ''
 * @param { number } zIndex 返回页面层级， 默认 -1 （表示返回一级）若想自定义层级则设置为 -xx
 * @param { boolean } isCache 页面是否缓存数据，默认 false(如设置为true，则路由与页面中必须配置name属性)
 */
// 路由自定义meta参数
export interface Meta {
  title?: string;
  backUrl?: string;
  border?: boolean;
  isBackShow?: boolean;
  isShowTabbar?: boolean;
  isShowHeader?: boolean;
  navLeftText?: string;
  zIndex?: number;
  isCache?: boolean;
}
