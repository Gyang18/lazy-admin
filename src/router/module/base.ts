/**
 * @Description:
 * @author 主要页面路由配置
 * @date 2020/1/27
 */
import { Router } from '@/types/router';
import { BaseLayout } from '@/layouts';

const baseRoutes: Router[] = [
  {
    path: '/base',
    component: BaseLayout,
    redirect: '/base/home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/Home'),
        meta: { title: '首页', isBackShow: false, isShowHeader: false },
      },
      {
        path: 'category',
        component: () => import('@/pages/Category'),
        meta: { title: '商品分类', isBackShow: false },
      },
      {
        path: 'cart',
        component: () => import('@/pages/Cart'),
        meta: { title: '购物车', isBackShow: false },
      },
      {
        path: 'user',
        component: () => import('@/pages/User'),
        meta: { title: '我的', isBackShow: false, isShowHeader: false },
      },
    ],
  },
];

export default baseRoutes;
