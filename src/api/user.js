import request from '@/utils/request'

const prefix = '/user/'

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
