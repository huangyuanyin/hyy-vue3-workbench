import mitt from 'mitt'

// 可以使用mitt方法创建多个事件分发器
// 触发和事件的时候，必须使用同一个事件分发器
export const emitter = mitt()
