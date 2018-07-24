
import * as ObjectUtil from 'util/object-util'
import { Record } from 'immutable'

export const composeFactory = (a,b) => {
  const obj = ObjectUtil.compose(a().toObject(),b().toObject())
  const toJs = c => ObjectUtil.compose(a.toJs(c),b.toJs(c))
  const fromJs = c => compose(a.fromJs(c),b.fromJs(c))
  return createFactory(obj, toJs, fromJs)
}

export const compose = (a,b) => {
  console.log(a,b)
  const factory = composeFactory(a.constructor, b.constructor)
  return factory(ObjectUtil.compose(a.toObject(),b.toObject()))
}

export const emptyFactory = () => {
  const obj = {}
  const toJs = a=>{return{}}
  const fromJs = a=>{return{}}
  return createFactory(obj, toJs, fromJs)()
}

export const createFactory = (obj,toJs,fromJs) => {
  const a = Record(obj)
  a.toJs = toJs
  const to_js_keys = Object.keys(toJs(a()))
  a.fromJs = c => {
    if (ObjectUtil.hasKeys(to_js_keys,c)) {
      console.log(a(fromJs(c)))
      return a(fromJs(c))
    } else {
      console.log(emptyFactory())
      return emptyFactory()
    }
  }
  return a
}