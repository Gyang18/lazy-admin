/**
 * @Description:
 * @author 主要页面路由配置
 * @date 2020/1/27
 */
import { Router } from '@/types/router';
import { BaseLayout, BlankLayout } from '@/layouts';

const baseRoutes: Router[] = [
  {
    path: '/base',
    component: BaseLayout,
    redirect: '/base/home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/Home'),
        meta: {
          title: '首页', isBackShow: false, isShowHeader: false, isShowTabbar: true,
        },
      },
      {
        path: 'category',
        component: () => import('@/pages/Category'),
        meta: { title: '商品分类', isBackShow: false, isShowTabbar: true },
      },
      {
        path: 'cart',
        component: () => import('@/pages/Cart'),
        meta: { title: '购物车', isBackShow: false, isShowTabbar: true },
      },
      {
        path: 'user',
        component: () => import('@/pages/User'),
        meta: {
          title: '我的', isBackShow: false, isShowHeader: false, isShowTabbar: true,
        },
      },
      {
        path: '/goods',
        component: BlankLayout,
        children: [
          {
            path: 'goods-list',
            component: () => import('@/pages/Goods/List'),
            meta: { isShowHeader: true, title: '商品列表' },
          },
          {
            path: 'goods-detail',
            component: () => import('@/pages/Goods/Details'),
            meta: { isShowHeader: true, title: '商品详情' },
          },
        ],
      },
      {
        path: 'address/list',
        component: () => import('@/pages/Address/List'),
        meta: { title: '收货地址' },
      },
      {
        path: 'address/edit',
        component: () => import('@/pages/Address/Edit'),
        meta: { title: '编辑收货地址' },
      },
    ],
  },
];

export default baseRoutes;
