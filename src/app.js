
import React from 'react'

import ReactDOM from 'react-dom'

// import MainSpace from 'components/main-space'
// import Header from 'components/header'

import 'css/app.css'

// import ErrorBoundary from 'components/error-boundary'

import { generateRandomString } from 'random-gen'

import store from 'reducers/store'


const Store = store((props) => {
  console.log(props)
  window.props = props
  return (
    <div>
      tucetsauicertcuiaretcuitecuitrecui tuic ecuier tcuietcuiaretcuiacetauicuitaecautricetraui
    </div>
  )
})

const app = () => {
  let root_div = document.createElement('div')
  root_div.setAttribute('id','root')

  if (document.body !== null) {
    document.body.appendChild(root_div)
  }


  ReactDOM.render(
    <Store/>,
    root_div
  )

  // ReactDOM.render(
  //   <div className='grid-y grid-frame'>
  //     <div className='cell'>
  //       <Header/>
  //     </div>
  //     <div className='cell auto'>
  //       <MainSpace/>
  //     </div>
  //   </div>,
  //   root_div
  // )
}

window.onload = app
