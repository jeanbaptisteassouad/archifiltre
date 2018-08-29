import React from 'react'
// import { connect } from 'react-redux'

import { mkB } from 'components/button'

// import { reInit as re1 } from 'reducers/database'
// import { reInit as re2 } from 'reducers/app-state'
// import { setNoFocus as re4 } from 'reducers/icicle-state'
// import { setNoDisplayRoot as re5 } from 'reducers/icicle-state'

// import { commit } from 'reducers/root-reducer'

import { tr } from 'dict'

const ReinitButton = props => {
  const api = props.api
  const database = api.database
  const app_state = api.app_state
  const icicle_state = api.icicle_state
  const undo = api.undo
  const reInitStateApp = () => {
    database.reInit()
    app_state.reInit()
    icicle_state.setNoFocus()
    icicle_state.setNoDisplayRoot()
    undo.commit()
  }
    // reInitStateApp: (...args) => {
    //   dispatch(re1())
    //   dispatch(re2())
    //   dispatch(re4())
    //   dispatch(re5())
    //   dispatch(commit())
    // }

  return mkB(reInitStateApp, tr("Close"), true, "#e04d1c")
}

export default ReinitButton