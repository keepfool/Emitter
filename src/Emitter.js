export default class Emitter {
  /**
   * 添加事件监听
   * @param {String} event        事件名称
   * @param {Function} listener   监听函数
   */
  on (event, listener) {
    this._eventCollection = this._eventCollection || {}

    this._eventCollection[event] = this._eventCollection[event] || []

    this._eventCollection[event].push(listener)
  }
  /**
   * 移除事件监听
   * @param {String} event        事件名称
   * @param {Function} listener   监听函数
   */
  off(event, listener) {
    let listeners 

    if (!this._eventCollection || !(listener = this._eventCollection[event])) {
      return this
    }

    listeners.forEach((fn, i) => {
      if (fn === listener || fn.listener === listener) {
        listeners.splice(i, 1)
      }
    })

    if (listeners.length === 0) {
      delete this._eventCollection[event]
    }

    return this
  }
  /**
   * 只触发一次的事件监听
   * @param {String} event        事件名称
   * @param {Function} listener   监听函数
   */
  once (event, listener) {
    const self = this

    function fn () {
      self.off(event, fn)
      listener.apply(this, arguments)
    }

    fn.listener = listener

    this.on(event, fn)

    return this
  }
  /**
   * 按注册顺序执行事件监听集合中的函数
   * @param {String} event        事件名称
   * @param {...Object} args      传入listener的参数
   */
  emit (event, ...args) {
    let listeners

    if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
      return this
    }

    listeners = listeners.slice(0)

    listeners.forEach(fn => fn.apply(this, args))

    return this
  }
}