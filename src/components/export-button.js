import React from 'react'
import { connect } from 'react-redux'

import { selectDatabase } from 'reducers/root-reducer'
import { exportCsv } from 'csv'

import { tr } from 'dict'

const buttons_style = {
  width: '80%',
  margin: '0.2em'
}

const Presentational = props => {

  return (
    <button style={buttons_style} type="button" onClick={()=>exportCsv(props.getCsv())}>{tr("Export")}</button>
  )
}


const mapStateToProps = state => {
  let database = selectDatabase(state)
  return {
    getCsv: () => database.toCsvNoFilter()
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
