import React from 'react'
// import { connect } from 'react-redux'

import { mkB } from 'components/button'

// import { selectDatabase } from 'reducers/root-reducer'

import * as Csv from 'csv'
import { save, makeNameWithExt } from 'save'
import { tr } from 'dict'


const CsvButton = props => {
  // let database = selectDatabase(state)
  // return {
  //   getStrList2: database.toStrList2,
  //   getSessionName: database.getSessionName,
  // }
  const api = props.api
  const database = api.database
  const getStrList2 = database.getStrList2
  const getSessionName = database.gatSessionName

  const name = () => makeNameWithExt(getSessionName(),'csv')
  return mkB(
    ()=>{
      console.log('to csv')
      save(name(), Csv.toStr(getStrList2()))
    },
    tr('Export'),
    true)
}

export default CsvButton