
import React from 'react'

import ReactDOM from 'react-dom'

import ErrorBoundary from 'components/error-boundary'
import MainSpace from 'components/main-space'
import Header from 'components/header'
import ANewVersionIsAvailable from 'components/a-new-version-is-available'

import WindowResize from 'components/window-resize'

import 'css/app.css'

import { generateRandomString } from 'random-gen'

import { Store } from 'reducers/store'

import version from 'version'
import pick from 'languages'









import * as NodeFsUtil from 'util/node-fs-util'
let count

// console.time('all')
// console.time('copy')
// count = 0
// NodeFsUtil.cp(()=>{
//   count++
//   console.log(count)
// // },'/home/jibe/Desktop/CHOMA2010','/home/jibe/Desktop/copy')
// },'/home/jibe/Desktop/folder','/home/jibe/Desktop/tmp/a1')
// console.timeEnd('copy')

// console.time('tar')
// count = 0
// NodeFsUtil.tar2(()=>{
//   count++
//   console.log(count)
// },'/home/jibe/Desktop/tmp/a1','/home/jibe/Desktop/tmp/a2.tar')
// .then(()=>{
//   console.timeEnd('tar')
//   console.time('gzip')
//   count = 0
//   NodeFsUtil.cp(()=>{},'/home/jibe/Desktop/input.json','/home/jibe/Desktop/tmp/a3/input.json')
//   // return NodeFsUtil.gzip('/home/jibe/Desktop/tmp/a2.tar','/home/jibe/Desktop/tmp/a3/a3.tar.gz')
// })
// .then(()=>{
//   console.timeEnd('gzip')
//   console.time('last step')
//   return NodeFsUtil.tar2(()=>{},'/home/jibe/Desktop/tmp/a3','/home/jibe/Desktop/tmp/a4.tar')
// })
// .then(()=>{
//   return NodeFsUtil.extractByName(
//     'input.json',
//     '/home/jibe/Desktop/tmp/a4.tar',
//     '/home/jibe/Desktop/tmp'
//   )
// })
// .then(()=>{
//   console.log('ZZZZZZZZZZZZZZ')
//   return NodeFsUtil.packByName(
//     'ttttttttt',
//     'a3/input.json',
//     '/home/jibe/Desktop/tmp/a4.tar',
//     '/home/jibe/Desktop/tmp/a4.2.tar'
//   )
// })
// .then(()=>{
//   console.timeEnd('last step')
//   console.log('AAAAAAAAAAAAAA')
//   return NodeFsUtil.untar(()=>{},'/home/jibe/Desktop/tmp/a4.2.tar','/home/jibe/Desktop/tmp/a5')
// })
// .then(()=>{
//   console.log('BBBBBBBBBBBBBB')
//   return NodeFsUtil.gunzip('/home/jibe/Desktop/tmp/a5/a3.tar.gz','/home/jibe/Desktop/tmp/a6.tar')
// })
// .then(()=>{
//   console.log('CCCCCCCCCCCCCC')
//   return NodeFsUtil.untar(()=>{},'/home/jibe/Desktop/tmp/a6.tar','/home/jibe/Desktop/tmp/a7')
// })
// .then(()=>{
//   console.timeEnd('all')
// })






const input_paths = [
  '/home/jibe/Desktop/input.json',
  '/home/jibe/Desktop/folder',
]
const tar_path = '/home/jibe/Desktop/t.tar'
const updated_tar_path = '/home/jibe/Desktop/t2.tar'
const last_tar_path = '/home/jibe/Desktop/t3.tar'


NodeFsUtil.tar2(()=>{},input_paths,tar_path)
// .then(()=>{
//   console.log('aaaaaaaaa')
//   return NodeFsUtil.updateTarByName(
//     'ttttttttt',
//     'input.json',
//     tar_path,
//     updated_tar_path,
//   )
// })
// .then(()=>{
//   console.log('bbbbbbbbb')
//   return NodeFsUtil.readTarByName(
//     'input.json',
//     updated_tar_path,
//   )
// })
// .then(()=>{
//   return new Promise((resolve,reject) => {
//     setTimeout(function() {resolve()}, 1000)
//   })
// })
.then((a)=>{
  console.log('cccccccccc')
  console.log(a)
  a = 'tststststs'
  return NodeFsUtil.updateTarByName(
    a+' '+a,
    'input.json',
    updated_tar_path,
    last_tar_path,
  )
})
// .then(()=>{
//   NodeFsUtil.untar(()=>{},last_tar_path,'/home/jibe/Desktop/tttt')
// })


















document.title = pick({
  en:'icicle v'+version+' - archifiltre',
  fr:'stalactite v'+version+' - archifiltre',
})


// import Analytics from 'electron-ga' // development

// const analytics = new Analytics('UA-115293619-2') // development

// analytics.send('pageview',{ // development
//   dh:'https://archifiltre.electron/', // development
//   dp:'/electron/v9', // development
//   dt:'archifiltre', // development
// }) // development





const app = () => {
  let root_div = document.createElement('div')
  root_div.setAttribute('id','root')

  if (document.body !== null) {
    document.body.appendChild(root_div)
  }


  ReactDOM.render(
    <Store>
      {props => {
        const api = props.api
        return (
          <ErrorBoundary api={api}>
            <WindowResize/>
            <div className='grid-y grid-frame'>
              <div className='cell'>
                <ANewVersionIsAvailable/>
              </div>
              <div className='cell'>
                <Header api={api}/>
              </div>
              <div className='cell auto'>
                <MainSpace api={api}/>
              </div>
            </div>
          </ErrorBoundary>
        )
      }}
    </Store>
    ,
    root_div
  )
}

window.onload = app

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
  return false
}

window.ondragover = window.ondrop = (ev) => {
  ev.preventDefault()
  return false
}
