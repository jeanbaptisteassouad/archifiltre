import * as Arbitrary from 'test/arbitrary'

import * as ArrayUtil from 'array-util'

(function () {
  const Record = Immutable.Record


  const composeRecordFactory = (a,b) => {
    return Record(Object.assign({}, b().toJS(), a().toJS()))
  }

  const composeRecord = (a,b) => {
    const factory = composeRecordFactory(a.constructor, b.constructor)
    return factory(Object.assign({}, b.toJS(), a.toJS()))
  }

  const f_a = Record({
    a:1,
    b:2,
    t:11,
  })

  const f_b = Record({
    c:3,
    d:4,
    t:22,
  })

  const a = f_a({
    a:31,
    b:-99,
  })
  const b = f_b({
    c:789,
    d:45,
  })

  const c = composeRecord(a,b)

  console.log({a,get:a.get('auieau'),set:a.set('uieaue',23),b,c,factory:new c.constructor()})

})()






const Derivated = Record({
  size:0,
  last_modified:[0],
  depth:0,
  nb_files:0,
  sort_by_size_index:[],
  sort_by_date_index:[],
})


const Tag = Record({
  name:'',
  ff_ids:[],
})

const TagDerivated = Record({
  size:0,
})













export const arbitraryMockFile = () => {
  return {
    size:Arbitrary.natural(),
    last_modified:Arbitrary.natural(),
  }
}

export const arbitraryPath = () => {
  return '/'+Arbitrary.array(Arbitrary.string).join('/')
}

const v_folder = Record({
  name:'default_name',
  alias:'',
  comments:'',
  children:List(),
})


const v_file = Record({
  size:0,
  last_modified:0,
})


export const ffs = a => {
  return a.map(__ffs__).reduce((acc,val)=>mergeFfs(val,acc), emptyFfs)
}

const __ffs__ = ([file,path]) => {
  const names = path.split('/')
  const ids = names.map((name,i)=>name+i)
  const childrens = ids.slice(1).map(a=>List.of(a)).concat([List()])

  let m = Map()

  const loop = ArrayUtil.zip([names,ids,childrens])
  loop.forEach(([name,id,children])=>{
    m = m.set(id,v_folder({
      name,
      children,
    }))
  })

  ids.slice(-1).forEach(id=>{
    m = m.update(id,a=>{
      return composeRecord(v_file({
        size:file.size,
        last_modified:file.lastModified,
      }),a)
    })
  })
  
  return m
}

const emptyFfs = ()=>Map()

const mergeFfs = (a,b) => {
  const merger = (oldVal, newVal) => {
    oldVal = oldVal.update('children',b=>b.concat(newVal.get('children')))
    return oldVal
  }
  return b.mergeWith(merger, a)
}

const reduceFfs = (reducer,m) => {
  const rec = (id) => {
    const node = m.get(id)
    const children_ans_array = node.get('children').map(rec)
    const [ans,next_node] = reducer(children_ans_array,node)
    m = m.set(id,next_node)
    return ans
  }
  return [rec('0'),m]
}

const ffsInv = m => {
  const reducer = (children_ans_array,node) => {
    if (children_ans_array.length === 0) {
      const file = {
        size:node.get('size'),
        last_modified:node.get('last_modified'),
      }
      const path = node.get('name')
      return [[[file,path]],node]
    } else {
      
    }
    return [,node]
  }
  return ffsInvRec(m['0'],m)
}

const ffsInvRec = (id,m) => {

}



const tags = () => {
  return Map()
}
