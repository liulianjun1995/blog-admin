import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}
