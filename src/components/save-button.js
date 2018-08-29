import React from 'react'
// import { connect } from 'react-redux'

import { mkB } from 'components/button'

// import { selectDatabase } from 'reducers/root-reducer'

import { save, makeNameWithExt } from 'save'
import { tr } from 'dict'


const SaveButton = props => {
  // let database = selectDatabase(state)
  // return {
  //   getJson: database.toJson,
  //   getSessionName: database.getSessionName,
  // }
  const api = props.api
  const database = api.database
  const getJson = database.getJson
  const getSessionName = database.gatSessionName


  const name = () => makeNameWithExt(getSessionName(),'json')
  return mkB(
    ()=>{
      save(name(), getJson())
    },
    tr('Save'),
    true
  )
}

export default SaveButton