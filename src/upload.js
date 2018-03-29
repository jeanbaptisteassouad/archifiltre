
import { Set } from 'immutable'
import FileSaver from 'file-saver'
import elasticsearch from 'elasticsearch'

import { tr } from 'dict'

var client = new elasticsearch.Client({
  host: '0.0.0.0:9200',
  log: 'trace'
})

client.ping({
  requestTimeout: 30000,
}, error => {
  if (error) {
    console.error(tr('elasticsearch cluster is down!'));
  } else {
    console.log(tr("Successfully connected to krojolo/elasticsearch"))
  }
});


export function indexFile(file, index_name) {
  //var blob = new Blob([JSON.stringify(file)], {type: "application/json;charset=utf-8"})
  // if (optional_name===undefined) {
  //   optional_name = file.name
  // }

  //FileSaver.saveAs(blob, 'icicle_'+optional_name+'.json')


  client.indices.exists({index:index_name}, (err, res) => {
    if(err){
      console.error(tr("Error"))
    }
    else {
      if(!(res)){
        client.indices.create({index:index_name})
        console.log("créé index " + index_name)
      }
      
    }

      console.log(tr("Uploading file ") + file.name)

    let doc = {
      index: index_name,
      body: file,
      type: "file"
    }

    console.log(doc)

    client.index(doc, (err, res) => {
      if(err){
        console.error(tr("Error while indexing file ") + file.name + " : " + err)
      }
      else{
        console.log(res)
        console.log(tr("Success!"))
      }
    })
  })

}