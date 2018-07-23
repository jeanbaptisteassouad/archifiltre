import chai from 'chai'
const should = chai.should()

import * as Loop from 'test/loop'
import * as Arbitrary from 'test/arbitrary'
import * as M from 'compose-record'

describe('compose-record', function() {

  Loop.equal('(ffsInv . ffs) a', () => {
    const a = M.arbitraryOrigin()
    return [M.sortOrigin(M.ffsInv(M.ffs(a))), M.sortOrigin(a)]
  })


})
