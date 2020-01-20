import request from '@/utils/request'

const prefix = '/admin/'

export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: prefix + '/logout',
    method: 'post'
  })
}

export function fetchAdminOptions(params) {
  return request({
    url: prefix + 'options',
    method: 'get',
    params
  })
}
