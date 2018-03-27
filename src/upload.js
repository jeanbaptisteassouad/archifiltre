
import { Set } from 'immutable'
import FileSaver from 'file-saver'


export function indexFile(file,optional_name) {
  var blob = new Blob([JSON.stringify(file)], {type: "application/json;charset=utf-8"})
  if (optional_name===undefined) {
    optional_name = file.name
  }
  
  //FileSaver.saveAs(blob, 'icicle_'+optional_name+'.json')
  console.log(JSON.stringify(file))
}