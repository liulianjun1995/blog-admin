import request from '@/utils/request'

const prefix = '/admin/'

export function fetchAdminOptions(params) {
  return request({
    url: prefix + 'options',
    method: 'get',
    params
  })
}
