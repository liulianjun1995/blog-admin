import request from '@/utils/request'

const prefix = '/oss/'

export function ApiGetSignature(data) {
  return request({
    url: prefix + 'signature',
    method: 'post',
    data
  })
}

