
import duck from 'reducers/duck'

import { Record } from 'immutable'


const State = Record({
  start:false,
  finish:false,
})

const initial_state = new State()

const reader = {
  isStarted: () => state => state.get('start'),
  isFinished: () => state => state.get('finish'),
}

const startToLoadFiles = () => state => {
  console.time('loaded')
  state = state.update('start', () => true) 
  state = state.update('finish', () => false) 
  return state
}

const finishedToLoadFiles = () => state => {
  console.timeEnd('loaded')
  state = state.update('start', () => true) 
  state = state.update('finish', () => true) 
  return state
}

const writer = {
  startToLoadFiles,
  finishedToLoadFiles,
}

export default duck('app_state',initial_state,reader,writer)

