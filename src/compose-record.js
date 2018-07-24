import * as Arbitrary from 'test/arbitrary'
import * as Loop from 'test/loop'

import * as ArrayUtil from 'util/array-util'
import * as ListUtil from 'util/list-util'
import * as RecordUtil from 'util/record-util'

import * as ObjectUtil from 'util/object-util'

import { Record, List, Map, Set } from 'immutable'




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
















const v_folder = RecordUtil.createFactory({
  name:'',
  alias:'',
  comments:'',
  children:List(),
}, a => {
  return {
    name:a.get('name'),
    alias:a.get('alias'),
    comments:a.get('comments'),
    children:a.get('children').toArray(),
  }
})

// const bbbb = a => {
//   return {
//     name:a.name,
//     alias:a.alias,
//     comments:a.comments,
//     children:List(a.children),
//   }
// }



const v_file = RecordUtil.createFactory({
  file_size:0,
  file_last_modified:0,
}, a => {
  return {
    file_size:a.get('file_size'),
    file_last_modified:a.get('file_last_modified'),
  }
})

// const bb = a => {
//   return {
//     file_size:a.file_size,
//     file_last_modified:a.file_last_modified,
//   }
// }


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
        return RecordUtil.compose(v_file({
          file_size:file.size,
          file_last_modified:file.lastModified,
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
        size:node.get('file_size'),
        lastModified:node.get('file_last_modified'),
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


















const v_derivated = RecordUtil.createFactory({
  size:0,
  last_modified_max:0,
  last_modified_list:List(),
  last_modified_min:Number.MAX_SAFE_INTEGER,
  last_modified_median:null,
  last_modified_average:null,
  depth:0,
  nb_files:0,
  sort_by_size_index:List(),
  sort_by_date_index:List(),
}, a => {
  return {}
})

const mergeDerivated = (a,b) => {
  b = b.update('size',b=>b+a.get('size'))
  b = b.update('last_modified_list',b=>b.concat(a.get('last_modified_list')))
  b = b.update('nb_files',b=>b+a.get('nb_files'))
  return b
}

const afterMergeDerivated = a => {
  const list = a.get('last_modified_list')
  a = a.set('last_modified_max',list.max())
  a = a.set('last_modified_min',list.min())
  a = a.set('last_modified_median',ListUtil.median(list))
  a = a.set('last_modified_average',ListUtil.average(list))
  return a
}

const sortChildren = (children_ans_array,a) => {
  const children_ans = List(children_ans_array)
  a = a.set(
    'sort_by_size_index',
    ListUtil.indexSort(a=>a.get('size'),children_ans).reverse()
  )
  a = a.set(
    'sort_by_date_index',
    ListUtil.indexSort(a=>a.get('last_modified_average'),children_ans)
  )
  return a
}

export const computeDerivated = m => {
  const reducer = ([children_ans_array,node]) => {
    let ans
    if (children_ans_array.length === 0) {
      const flm = node.get('file_last_modified')
      const size = node.get('file_size')
      ans = v_derivated({
        size,
        last_modified_max:flm,
        last_modified_list:List.of(flm),
        last_modified_min:flm,
        last_modified_median:flm,
        last_modified_average:flm,
        nb_files:1,
      })
    } else {
      ans = children_ans_array.reduce((acc,val)=>mergeDerivated(val,acc))
      ans = afterMergeDerivated(ans)
      ans = sortChildren(children_ans_array,ans)
    }
    node = RecordUtil.compose(ans,node)
    return [ans, node]
  }
  const [_,next_m] = reduceFfs(reducer,m)
  return next_m
}











export const toJs = a => {
  a = a.map(a=>a.constructor.toJs(a))
  a = a.toObject()
  return a
}







const tags = () => {
  return Map()
}
