import request from '@/utils/request'

// const prefix = '/user/'

export function login(data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'post'
  })
}

export function changeAvatar(data) {
  return request({
    url: 'auth/avatar',
    method: 'post',
    data
  })
}
