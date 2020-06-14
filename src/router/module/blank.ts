/**
 * @Description: 空白布局页面（只包含导航栏）
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
];

export default blankRoutes;
