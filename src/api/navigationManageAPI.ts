import request from '@/utils/request.js'

// 服务分组 - 获取
export function getCategoryApi() {
  return request({
    url: '/product/category/',
    method: 'Get',
    urlType: 'NetDevOps'
  })
}

// 服务分组 - 添加
export function getAddCategoryApi(params: any) {
  return request({
    url: '/product/category/',
    method: 'POST',
    urlType: 'NetDevOps',
    data: params
  })
}

// 产品服务 - 获取
export function getProductApi() {
  return request({
    url: '/product/provider/',
    method: 'Get',
    urlType: 'NetDevOps'
  })
}

// 产品服务 - 添加
export function getAddProductApi(params) {
  return request({
    url: '/product/provider/',
    method: 'POST',
    urlType: 'NetDevOps',
    data: params
  })
}

// 服务收藏 - 获取
export function getFavoriteApi(params) {
  return request({
    url: '/product/favorite/',
    method: 'Get',
    urlType: 'NetDevOps',
    params
  })
}

// 服务收藏 - 添加
export function addFavoriteApi(params) {
  return request({
    url: '/product/favorite/',
    method: 'POST',
    urlType: 'NetDevOps',
    data: params
  })
}

// 服务收藏 - 删除
export function removeFavoriteApi(params) {
  return request({
    url: '/product/favorite/',
    method: 'Delete',
    urlType: 'NetDevOps',
    params
  })
}
