# Emitter

## example

```javascript
import Emitter from './src/Emitter'

function extend (destination, from) {
  // class的方法默认是不可枚举的
  Object.getOwnPropertyNames(from).forEach((prop) => {
    if (prop !== 'constructor' && from[prop]) {
      destination[prop] = from[prop]
    }
  })
  return destination
}

function inherits (child, uber) {
  child.prototype = extend(child.prototype || {}, uber.prototype)
}

function Person (name) {
  this.name = name
}

/**
 * Person继承Emitter
 */
inherits(Person, Emitter)

let jack = new Person('jack')
// 注册'say'事件
jack.on('say', function (msg) {
  console.log(`${this.name} said: ${msg}`)
})

// 触发'say'事件
jack.emit('say', 'Hello!')
```
