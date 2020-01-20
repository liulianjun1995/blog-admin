import Layout from '@/layout'

const articleRouter = {
  path: '/article',
  component: Layout,
  redirect: '/article/list',
  name: 'Article',
  alwaysShow: true,
  meta: {
    title: '文章管理',
    icon: 'article-set',
    roles: ['admin']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/article/list'),
      name: 'article-list',
      meta: { title: '文章列表', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/article/create'),
      name: 'article-create',
      meta: { title: '创建文章', noCache: true, activeMenu: '/article/list' },
      hidden: true
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/article/edit'),
      name: 'article-edit',
      meta: { title: '编辑文章', noCache: true, activeMenu: '/article/list' },
      hidden: true
    },
    {
      path: 'tags',
      component: () => import('@/views/article/tag'),
      name: 'article-tags',
      meta: { title: '标签列表', icon: 'tag' }
    }
  ]
}

export default articleRouter
