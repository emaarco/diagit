import { describe, expect, it } from 'vitest'
import { allNotations } from '../../src/notations/allNotations'
import { diffableNotations } from '../../src/notations/diffableNotations'
import { NOTATION_CATALOG } from '../../src/notations/notationCatalog'

describe('notation registries', () => {
  it('render every catalogued notation', () => {
    expect(allNotations.all().map((notation) => notation.descriptor)).toEqual(NOTATION_CATALOG)
  })

  it('offer a differ exactly for the notations the catalogue marks as diffable', () => {
    for (const notation of allNotations.all()) {
      expect(notation.differ !== null, notation.descriptor.id).toBe(notation.descriptor.diffable)
    }
  })

  it('keep the diff registry to the diffable notations, so diff pages skip the other viewers', () => {
    const diffable = NOTATION_CATALOG.filter((notation) => notation.diffable)
    expect(diffableNotations.all().map((notation) => notation.descriptor)).toEqual(diffable)
  })

  it('resolve a path to its notation', () => {
    expect(allNotations.detect('flows/order.bpmn')?.descriptor.id).toBe('bpmn')
    expect(diffableNotations.detect('rules/decide.dmn')).toBeNull()
    expect(allNotations.detect('README.md')).toBeNull()
  })
})
