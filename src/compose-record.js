import * as Arbitrary from 'test/arbitrary'
import * as Loop from 'test/loop'

import * as ArrayUtil from 'array-util'

import { Record, List, Map, Set } from 'immutable'


// (function () {
//   const Record = Immutable.Record


//   const composeRecordFactory = (a,b) => {
//     return Record(Object.assign({}, b().toJS(), a().toJS()))
//   }

//   const composeRecord = (a,b) => {
//     const factory = composeRecordFactory(a.constructor, b.constructor)
//     return factory(Object.assign({}, b.toJS(), a.toJS()))
//   }

//   const f_a = Record({
//     a:1,
//     b:2,
//     t:11,
//   })

//   const f_b = Record({
//     c:3,
//     d:4,
//     t:22,
//   })

//   const a = f_a({
//     a:31,
//     b:-99,
//   })
//   const b = f_b({
//     c:789,
//     d:45,
//   })

//   const c = composeRecord(a,b)

//   console.log({a,get:a.get('auieau'),set:a.set('uieaue',23),b,c,factory:new c.constructor()})

// })()

export const composeRecordFactory = (a,b) => {
  return Record(Object.assign({}, b().toObject(), a().toObject()))
}

export const composeRecord = (a,b) => {
  const factory = composeRecordFactory(a.constructor, b.constructor)
  return factory(Object.assign({}, b.toObject(), a.toObject()))
}

const composeObject = (a,b) => {
  return Object.assign({}, b, a)
}




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













const arbitraryMockFile = () => {
  return {
    size:Arbitrary.natural(),
    lastModified:Arbitrary.natural(),
  }
}

const arbitraryPath = () => {
  const index = () => Arbitrary.index()+1
  const value = () => Math.floor(Math.random()*5)
  return '/'+Arbitrary.arrayWithIndex(index)(value).join('/')
}

export const arbitraryOrigin = () => {
  const index = () => Arbitrary.index()+1
  const a = Arbitrary.arrayWithIndex(index)(() => {
    return [arbitraryMockFile(), arbitraryPath()]
  })

  const compare = (a,b) => {
    if (a.length < b.length) {
      return a === b.slice(0,a.length)
    } else {
      return b === a.slice(0,b.length)
    }
  }

  return a.reduce((acc,val) => {
    const shouldAdd = acc.reduce((bool,val2) => bool && !compare(val2[1], val[1]), true)
    if (shouldAdd) {
      return acc.concat([val])
    } else {
      return acc
    }
  }, [])
}

export const sortOrigin = a => a.sort((a,b)=>{
  a = a[1]
  b = b[1]
  if (a < b) {
    return -1
  } else if (a === b) {
    return 0
  } else {
    return 1
  }
})








const v_folder = Record({
  name:'',
  alias:'',
  comments:'',
  children:List(),
})

const aaaa = a => {
  return {
    name:a.get('name'),
    alias:a.get('alias'),
    comments:a.get('comments'),
    children:a.get('children').toArray(),
  }
}

const bbbb = a => {
  return v_folder({
    name:a.name,
    alias:a.alias,
    comments:a.comments,
    children:List(a.children),
  })
}



const v_file = Record({
  size:0,
  last_modified:0,
})

const aa = a => {
  return {
    size:a.get('size'),
    last_modified:a.get('last_modified'),
  }
}

const bb = a => {
  return v_file({
    size:a.size,
    last_modified:a.last_modified,
  })
}


export const ffs = a => {
  const mapper = ([file,path]) => {
    const names = path.split('/')
    const ids = names.map((name,i)=>names.slice(0,i+1).join('/'))
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

  return a.map(mapper).reduce((acc,val)=>mergeFfs(val,acc), emptyFfs())
}

const emptyFfs = ()=>Map({
  '':v_folder(),
})

const mergeFfs = (a,b) => {
  const merger = (oldVal, newVal) => {
    oldVal = oldVal.update('children',b =>
      b.concat(newVal.get('children').filter(a=>b.includes(a)===false))
    )
    return oldVal
  }
  return b.mergeWith(merger, a)
}

const reduceFfs = (reducer,m) => {
  const rec = (id) => {
    const node = m.get(id)
    const children_ans_array = node.get('children').toArray().map(rec)
    const [ans,next_node] = reducer([children_ans_array,node])
    m = m.set(id,next_node)
    return ans
  }

  return [rec(''),m]
}

export const ffsInv = m => {
  const reducer = ([children_ans_array,node]) => {
    if (children_ans_array.length === 0) {
      const file = {
        size:node.get('size'),
        lastModified:node.get('last_modified'),
      }
      const path = node.get('name')
      const ans = [[file, path]]
      return [ans,node]
    } else {
      children_ans_array = ArrayUtil.join(children_ans_array)
      const ans = children_ans_array.map(a=>{
        const path = node.get('name') + '/' + a[1]
        return [a[0], path]
      })

      return [ans, node]
    }
  }
  const [ans,_] = reduceFfs(reducer,m)
  return ans
}



const tags = () => {
  return Map()
}
