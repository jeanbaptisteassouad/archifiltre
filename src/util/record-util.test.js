import chai from 'chai'
const should = chai.should()

import * as Loop from 'test/loop'
import * as Arbitrary from 'test/arbitrary'
import * as M from 'util/record-util'

describe('record-util', function() {

  it('compose : a . empty === empty . a', () => {
    const a = M.createFactory(
      {
        a:1,
        b:2,
      },
      a=>{return {b:a.get('b')*2,baba:'first',z:0}},
      a=>{return {b:a.b*2}}
    )

    const test = t => {
      t.toObject().should.deep.equal({
        a:1,
        b:2,
      })
      t.constructor.fromJs(t.constructor.toJs(t)).toObject().should.deep.equal({
        a:1,
        b:8,
      })
    }

    test(M.compose(a(),M.emptyFactory()))
    test(M.compose(M.emptyFactory(),a()))
  })


  it('compose : a . (b . c) === (a . b) . c', () => {
    const a = M.createFactory(
      {
        a:1,
        b:2,
      },
      a=>{return {b:a.get('b')*2,baba:'first',z:0}},
      a=>{return {b:a.b*2}}
    )

    const b = M.createFactory(
      {
        a:10,
        c:20,
        d:30,
      },
      a=>{return {d:a.get('d')*2,baba:'second'}},
      a=>{return {d:a.d*2}}
    )
    const c = M.compose(b(),a())
    
    c.toObject().should.deep.equal({
      a:10,
      b:2,
      c:20,
      d:30,
    })

    c.constructor.toJs(c).should.deep.equal({
      b:4,
      d:60,
      baba:'second',
      z:0,
    })

    // c.constructor.fromJs({
    //   b:2,
    //   d:30,
    //   baba:'second',
    //   z:0,
    // }).toObject().should.deep.equal({
    //   a:10,
    //   b:4,
    //   c:20,
    //   d:60,
    // })

    c.constructor.fromJs({
      b:2,
      d:30,
      baba:'second',
    }).toObject().should.deep.equal({
      a:10,
      c:20,
      d:60,
    })
  })

})
