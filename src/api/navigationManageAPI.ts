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

// 产品服务 - 获取（全部）
export function getProductApi() {
  return request({
    url: '/product/provider/',
    method: 'Get',
    urlType: 'NetDevOps'
  })
}

// 产品服务 - 获取（自定义）
export function getProductCustomizeApi(params) {
  return request({
    url: '/product/provider/',
    method: 'Get',
    urlType: 'NetDevOps',
    params
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

// 产品服务 - 删除
export function getRemoveProductApi(id) {
  return request({
    url: `/product/provider/${id}`,
    method: 'Delete',
    urlType: 'NetDevOps'
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
export function removeFavoriteApi(id) {
  return request({
    url: `/product/favorite/${id}`,
    method: 'Delete',
    urlType: 'NetDevOps'
  })
}
