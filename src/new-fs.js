
import * as RecordUtil from 'util/record-util'
import * as Ffs from 'ffs'

const v_fs = RecordUtil.createFactory({
  session_name:'Untitled',
  version:9,
  ffs:Ffs.emptyFfs(),
  tags:
},{
  toJs: a => {
    a.ffs = Ffs.toSaveJs(a.ffs)
    a.tags = 
    return a
  },
  fromJs: a => {
    a.ffs = Ffs.fromSaveJs()
  },
})

