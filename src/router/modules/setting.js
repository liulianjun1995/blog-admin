import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/user',
  name: 'Setting',
  alwaysShow: true,
  meta: {
    title: '个人设置',
    icon: 'setting'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/setting/user'),
      name: 'user-center',
      meta: { title: '个人中心', icon: 'user-center' }
    },
    {
      path: 'account',
      component: () => import('@/views/system/user'),
      name: 'user-account',
      meta: { title: '账户设置', icon: 'account' }
    }
  ]
}
export default settingRouter
