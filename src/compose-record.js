

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

  console.log({a,b,c,factory:new c.constructor()})

})()



const Folder = Record({
  name:'default_name',
  alias:'',
  comments:'',
  children:List(),
})


const File = Record({
  size:0,
  last_modified:0,
})



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


const FFs = Map()

const zip = (a,b) => {
  return a.map((a,i)=>[a,b[i]])
}

const zip3 = (a,b,c) => {
  return a.map((a,i)=>[a,b[i],c[i]])
}



const a = (file,path) => {
  const names = path.split('/')
  const ids = names.map((name,i)=>name+i)
  const childrens = ids.slice(1).map(a=>List.of(a)).concat([List()])

  let m = Map()

  const loop = zip3(names,ids,childrens)
  loop.forEach(([name,id,children])=>{
    m = m.set(id,Folder({
      name,
      children,
    }))
  })

  ids.slice(-1).forEach(id=>{
    m = m.update(id,a=>{
      return composeRecord(File({
        size:file.size,
        last_modified:file.lastModified,
      }),a)
    })
  })
  
  return m
}

const b = (a,b) => {
  const merger = (oldVal, newVal) => {
    oldVal = oldVal.update('children',b=>b.concat(newVal.get('children')))
    return oldVal
  }
  return b.mergeWith(merger, a)
}
