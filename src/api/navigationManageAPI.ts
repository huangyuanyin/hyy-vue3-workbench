import request from '@/utils/request.js'

// 服务分组 - 获取
export function getCategoryApi() {
  return request({
    url: '/product/category/',
    method: 'Get',
    urlType: 'Drawer'
  })
}

// 服务分组 - id获取
export function getCategoryIdApi(id) {
  return request({
    url: `/product/category/${id}`,
    method: 'Get',
    urlType: 'Drawer'
  })
}

// 服务分组 - 添加
export function getAddCategoryApi(params: any) {
  return request({
    url: '/product/category/',
    method: 'POST',
    urlType: 'Drawer',
    data: params
  })
}

// 服务分组 - 编辑
export function getEditCategoryApi(id, params) {
  return request({
    url: `/product/category/${id}`,
    method: 'put',
    urlType: 'Drawer',
    data: params
  })
}

// 服务分组 - 删除
export function getDeleteCategoryApi(id) {
  return request({
    url: `/product/category/${id}`,
    method: 'Delete',
    urlType: 'Drawer'
  })
}

// 产品服务 - 获取（全部）
export function getProductApi() {
  return request({
    url: '/product/provider/',
    method: 'Get',
    urlType: 'Drawer'
  })
}

// 产品服务 - 获取（自定义）
export function getProductCustomizeApi(params) {
  return request({
    url: '/product/provider/',
    method: 'Get',
    urlType: 'Drawer',
    params
  })
}

// 产品服务 - ID获取
export function getProductIdApi(id) {
  return request({
    url: `/product/provider/${id}`,
    method: 'Get',
    urlType: 'Drawer'
  })
}

// 产品服务 - 添加
export function getAddProductApi(params) {
  return request({
    url: '/product/provider/',
    method: 'POST',
    urlType: 'Drawer',
    data: params
  })
}

// 产品服务 - 编辑
export function getEditProductApi(id, params) {
  return request({
    url: `/product/provider/${id}`,
    method: 'put',
    urlType: 'Drawer',
    data: params
  })
}

// 产品服务 - 删除
export function getRemoveProductApi(id) {
  return request({
    url: `/product/provider/${id}`,
    method: 'Delete',
    urlType: 'Drawer'
  })
}

// 服务收藏 - 获取
export function getFavoriteApi(params) {
  return request({
    url: '/product/favorite/',
    method: 'Get',
    urlType: 'Drawer',
    params
  })
}

// 服务收藏 - 添加
export function addFavoriteApi(params) {
  return request({
    url: '/product/favorite/',
    method: 'POST',
    urlType: 'Drawer',
    data: params
  })
}

// 服务收藏 - 删除
export function removeFavoriteApi(id) {
  return request({
    url: `/product/favorite/${id}`,
    method: 'Delete',
    urlType: 'Drawer'
  })
}
