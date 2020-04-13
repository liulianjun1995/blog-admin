import request from '@/utils/request'

const prefix = '/category/'

export function ApiCategoryOptions() {
  return request({
    url: prefix + 'options',
    method: 'get'
  })
}

export function ApiCategoryList(params) {
  return request({
    url: prefix + 'list',
    method: 'get',
    params
  })
}

export function ApiCategoryOrder(data) {
  return request({
    url: prefix + 'order',
    method: 'post',
    data
  })
}
