/**
 * @Description: 空白布局页面
 * @author yang
 * @date 2020/1/31
 */
import { Router } from '@/types/router';
import { BlankLayout } from '@/layouts';

const blankRoutes: Router[] = [
  {
    path: '/blank',
    component: BlankLayout,
    children: [
      {
        path: 'login',
        component: () => import('@/pages/Login'),
        meta: { title: '登陆' },
      },
    ],
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
];

export default blankRoutes;
