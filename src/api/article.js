import request from '@/utils/request'

const prefix = '/article/'

export function fetchList(params) {
  return request({
    url: prefix + 'list',
    method: 'get',
    params
  })
}

export function fetchArticle(id) {
  return request({
    url: prefix + `detail/${id}`,
    method: 'get'
  })
}

export function fetchArticleCategory() {
  return request({
    url: prefix + 'category',
    method: 'get'
  })
}

export function createTag(data) {
  return request({
    url: prefix + 'createTag',
    method: 'post',
    data
  })
}
