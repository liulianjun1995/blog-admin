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

export function changeStatus(id, status) {
  return request({
    url: prefix + `status/${id}`,
    method: 'post',
    data: { status }
  })
}

export function createArticle(data) {
  return request({
    url: prefix + `create`,
    method: 'post',
    data
  })
}

export function uploadImage(data) {
  return request({
    url: prefix + `upload-image`,
    method: 'post',
    data
  })
}

export function deleteImage(image) {
  return request({
    url: prefix + `delete-image`,
    method: 'post',
    data: { image }
  })
}

export function updateArticle(id, data) {
  return request({
    url: prefix + `update/${id}`,
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

