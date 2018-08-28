
import duck from 'reducers/duck'
import { Record } from 'immutable'

const State = Record({
  editing_tags:false,
  editing_comments:false,
  candidate_comments:''
})

const initial_state = new State()

const reader = {
  editing_tags: () => state => state.get('editing_tags'),
  editing_comments: () => state => state.get('editing_comments'),
  candidate_comments: () => state => state.get('candidate_comments'),
}

const startEditingTags = () => state => {
  state = state.update('editing_tags',(a)=>true)
  return state
}

const stopEditingTags = () => state => {
  state = state.update('editing_tags',(a)=>false)
  return state
}

const startEditingComments = () => state => {
  state = state.update('editing_comments',(a)=>true)
  return state
}

const stopEditingComments = () => state => {
  state = state.update('editing_comments',(a)=>false)
  state = state.set('candidate_comments','')
  return state
}

const setCandidateComments = (comments) => state => {
  state = state.set('candidate_comments',comments)
  return state
}

const writer = {
  startEditingTags,
  stopEditingTags,
  startEditingComments,
  stopEditingComments,
  setCandidateComments,
}

export default duck('report-state',initial_state,reader,writer)
