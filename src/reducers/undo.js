
import { generateRandomString } from 'random-gen'
import { Map, List, Record } from 'immutable'

import * as ObjectUtil from 'util/object-util'


const length_limit = 1000

const initialState = s => {
  return {
    content: s,
    past: [],
    present: s,
    future: [],
  }
}

const get = s => s.content
const set = (a,s) => ObjectUtil.compose({content:a},s)



const hasAPast = () => state => state.past.length !== 0
const hasAFuture = () => state => state.future.length !== 0

const reader = {
  hasAPast,
  hasAFuture,
}

const commit = () => (state) => {
  state = Object.assign({},state)
  state.past = state.past.concat([state.present])
  if (state.past.length > length_limit) {
    state.past = state.past.slice(1)
  }
  state.present = state.content
  state.future = []
  return state
}

const undo = () => (state) => {
  state = Object.assign({},state)
  if (hasAPast()(state)) {
    state.future = [state.present].concat(state.future)
    state.present = state.past.slice(-1)[0]
    state.past = state.past.slice(0,-1)
    state.content = state.present
  }
  return state
}

const redo = () => (state) => {
  state = Object.assign({},state)
  if (hasAFuture()(state)) {
    state.past = state.past.concat([state.present])
    state.present = state.future[0]
    state.future = state.future.slice(1)
    state.content = state.present
  }
  return state
}

const writer = {
  commit,
  undo,
  redo,
}




const create = (real_estate) => {

  const init = s => {
    return ObjectUtil.compose(initialState(real_estate.initialState({})),s)
  }

  const rea = {}
  for (key in real_estate.reader) {
    rea[key] = (...args) => real_estate.reader(...args)
    rea[key].get = [get].concat(reader[key].get)
  }
  for (key in reader) {
    rea[key] = (...args) => reader(...args)
    rea[key].get = [s=>s]
  }

  const wri = {}
  for (key in real_estate.writer) {
    wri[key] = (...args) => real_estate.writer(...args)
    wri[key].get = [get].concat(writer[key].get)
    wri[key].set = [set].concat(writer[key].set)
  }
  for (key in writer) {
    wri[key] = (...args) => writer(...args)
    wri[key].get = [s=>s]
    wri[key].set = [(a,s)=>a]
  }

  return {
    initialState:init,
    reader:rea,
    writer:wri,
  }
}








// const State = Record({
//   content: undefined,
//   pastC: List(),
//   presentC: undefined,
//   futureC: List()
// })









// const size_limit = 1000

// export default function undoReducer(fRedux) {
//   const rand = '_'+generateRandomString(40)
//   const commit_type = 'commit'+rand
//   const undo_type = 'undo'+rand
//   const redo_type = 'redo'+rand


//   function reducer(state = new State(), action) {
//     if (action.type === commit_type) {
//       return commitH(state)
//     } else if (action.type === undo_type) {
//       return undoH(state)
//     } else if (action.type === redo_type) {
//       return redoH(state)
//     } else {
//       return pass(state, action)
//     }
//   }

//   const hasAPast = state => state.get('pastC').size !== 0
//   const hasAFuture = state => state.get('futureC').size !== 0

//   function commitH(state) {
//     state = state.update('pastC', a=>a.push(state.get('presentC')))
//     if (state.get('pastC').size > size_limit) {
//       state = state.update('pastC', a=>a.slice(1))
//     }
//     state = state.set('presentC', state.get('content'))
//     state = state.set('futureC', List())
//     return state
//   }

//   function undoH(state) {
//     if (hasAPast(state)) {
//       state = state.update('futureC', a=>a.insert(0, state.get('presentC')))
//       state = state.set('presentC', state.get('pastC').get(-1))
//       state = state.update('pastC', a=>a.slice(0, -1))
//       state = state.set('content', state.get('presentC'))
//     }
//     return state
//   }

//   function redoH(state) {
//     if (hasAFuture(state)) {
//       state = state.update('pastC', a=>a.push(state.get('presentC')))
//       state = state.set('presentC', state.get('futureC').get(0))
//       state = state.update('futureC', a=>a.slice(1))
//       state = state.set('content', state.get('presentC'))
//     }
//     return state
//   }

//   function pass(state, action) {
//     state = state.update('content', c => fRedux(c, action))
//     if (!state.get('presentC')) {
//       state = state.set('presentC', state.get('content'))
//     }
//     return state
//   }

//   const commit = () => {return {type:commit_type}}
//   const undo = () => {return {type:undo_type}}
//   const redo = () => {return {type:redo_type}}

//   const selectContent = state => state.get('content')


//   return { commit, undo, redo, reducer, hasAPast, hasAFuture, selectContent }
// }