
import { Set } from 'immutable'
import FileSaver from 'file-saver'
import elasticsearch from 'elasticsearch'

var client = new elasticsearch.Client({
  host: '0.0.0.0:9200',
  log: 'trace'
})

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});


export function indexFile(file,optional_name) {
  var blob = new Blob([JSON.stringify(file)], {type: "application/json;charset=utf-8"})
  if (optional_name===undefined) {
    optional_name = file.name
  }

  //FileSaver.saveAs(blob, 'icicle_'+optional_name+'.json')
  console.log(JSON.stringify(file))
}