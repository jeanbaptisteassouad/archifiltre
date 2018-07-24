

export const compose = (a,b) => {
  return Object.assign({}, b, a)
}

export const hasKeys = (keys,obj) => {
  return keys.reduce((acc,val)=>acc&&obj.hasOwnProperty(val),true)
}