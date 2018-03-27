import React from 'react'
import { connect } from 'react-redux'

import { selectDatabase } from 'reducers/root-reducer'
import { upload } from 'upload'

import { tr } from 'dict'


const buttons_style = {
  width: '80%',
  margin: '0.2em'
}


const Presentational = props => {

  return (
    <button type="button" style={buttons_style} onClick={()=>props.uploadFiles()}>{tr("Index files")}</button>
  )
}


const mapStateToProps = state => {
  let database = selectDatabase(state)
  return {
    uploadFiles: () => database.uploadFiles()
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}


const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational)

export default Container
