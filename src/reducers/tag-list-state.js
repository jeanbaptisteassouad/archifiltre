
import duck from 'reducers/duck'
import { Record } from 'immutable'

const State = Record({
  tag_being_edited: '',
})

const initial_state = new State()

const reader = {
  tag_being_edited: () => state => state.get('tag_being_edited'),
}

const setTagBeingEdited = (tag) => state => {
  state = state.update('tag_being_edited',(a)=>tag)
  return state
}

const setNoTagBeingEdited = () => state => {
  state = state.update('tag_being_edited',(a)=>'')
  return state
}

const writer = {
  setTagBeingEdited,
  setNoTagBeingEdited,
}

export default duck('tag-list-state',initial_state,reader,writer)

