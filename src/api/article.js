import request from '@/utils/request'

const prefix = '/article/'

export function fetchList(params) {
  return request({
    url: prefix + 'list',
    method: 'get',
    params
  })
}

export function createArticle(data) {
  return request({
    url: prefix + `create`,
    method: 'post',
    data
  })
}

export function updateArticle(id, data) {
  return request({
    url: prefix + `${id}/update`,
    method: 'post',
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: prefix + `${id}/detail`,
    method: 'get'
  })
}

export function changeProfile(id, data) {
  return request({
    url: prefix + `${id}/profile`,
    method: 'post',
    data
  })
}

export function fetchTagList(params) {
  return request({
    url: prefix + 'tags',
    method: 'get',
    params
  })
}

export function fetchTag(id) {
  return request({
    url: prefix + `tag/${id}`,
    method: 'get'
  })
}

export function createTag(data) {
  return request({
    url: prefix + 'tag/create',
    method: 'post',
    data
  })
}

export function updateTag(id, data) {
  return request({
    url: prefix + `tag/update/${id}`,
    method: 'post',
    data
  })
}

