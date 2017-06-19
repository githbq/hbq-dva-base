import { request } from '@/utils'

export async function getToken (params) {
  const data = { 
  }
  return request('/oauth/token', {
    method: 'post',
    data: data
  })
}

export async function login (params) {
  return request('/admin/check', {
    method: 'post',
    data: params
  })
}

export async function logout (params) {
  return request('/api/logout', {
    method: 'post',
    data: params
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params
  })
}
