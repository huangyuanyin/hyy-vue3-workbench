import request from '@/utils/request.js'

// 硬件性能数据 - 获取
export function getDeviceMonitorApi() {
  return request({
    url: '/product/device_monitor/',
    method: 'Get',
    urlType: 'NetDevOps'
  })
}
