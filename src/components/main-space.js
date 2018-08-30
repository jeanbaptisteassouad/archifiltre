import React from 'react'

import FolderDropzone from 'components/folder-dropzone'

import WorkSpace from 'components/workspace'
import WorkSpaceTime from 'components/workspace-time'

import WaitingScreen from 'components/waiting-screen'

import { tr } from 'dict'

const grid_style = {
  padding: '0em 5em',
}

const MainSpace = props => {
  const api = props.api
  const app_state = api.app_state
  const icicle_state = api.icicle_state

  const started = app_state.isStarted()
  const finished = app_state.isFinished()
  const change_skin = icicle_state.changeSkin()

  if (started === false && finished === false) {
    return (
      <div className='grid-y grid-padding-x grid-frame align-center' style={grid_style}>
        <div className='cell small-8'>
          <FolderDropzone/>
        </div>
      </div>
    )
  } else if (started === true && finished === false) {
    return (
      <div className='grid-y grid-padding-x grid-frame align-center'>
        <div className='cell small-8'>
          <WaitingScreen/>
        </div>
      </div>
    )
  } else {
    return (
      <div className='grid-y grid-padding-x grid-frame align-center'>
        <div className='cell small-12'>
          {change_skin === false && <WorkSpace/>}
          {change_skin === true && <WorkSpaceTime/>}
        </div>
      </div>
    )
  }
}

export default MainSpace