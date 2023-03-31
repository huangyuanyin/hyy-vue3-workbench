import request from '@/utils/request.js'

export function login(data: any) {
  return request({
    url: '/user/login/',
    method: 'post',
    urlType: 'Login',
    whitelist: true,
    data
  })
}

export function userListApi(data: any) {
  return request({
    url: '/user/select_UserList/',
    method: 'post',
    urlType: 'NetUser',
    data
  })
}

export function addUserApi(data: any) {
  return request({
    url: '/user/Add_User/',
    method: 'post',
    urlType: 'NetUser',
    data
  })
}

export function getUserApi(data: any) {
  return request({
    url: '/user/select_UserInfo/',
    method: 'post',
    urlType: 'NetUser',
    data
  })
}

export function updateUserApi(data: any) {
  return request({
    url: '/user/Update_User/',
    method: 'post',
    urlType: 'NetUser',
    data
  })
}

export function bindRoleApi(data: any) {
  return request({
    url: '/user/User_BindRole/',
    method: 'post',
    urlType: 'NetUser',
    data
  })
}

export function deleteUserApi(data: any) {
  return request({
    url: '/user/Delete_User/',
    method: 'post',
    urlType: 'NetUser',
    data
  })
}
