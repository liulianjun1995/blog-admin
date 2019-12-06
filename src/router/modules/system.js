import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system',
  name: 'System',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'systemSet',
    roles: ['admin']
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/system/user'),
      name: 'user',
      meta: { title: '用户管理', icon: 'user' }
    },
    {
      path: 'user/create',
      component: () => import('@/views/system/user-create'),
      name: 'user-create',
      meta: { title: '创建用户', icon: 'create' },
      hidden: true
    }
  ]
}
export default systemRouter
