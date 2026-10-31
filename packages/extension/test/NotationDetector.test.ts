import { describe, expect, it } from 'vitest'
import { notationDetector } from '../src/notations/NotationDetector'

describe('NotationDetector', () => {
  it('maps .bpmn and .dmn to their notations (case-insensitive)', () => {
    expect(notationDetector.detect('/group/repo/-/blob/main/flow.bpmn')?.id).toBe('bpmn')
    expect(notationDetector.detect('/org/repo/blob/main/decision.dmn')?.id).toBe('dmn')
    expect(notationDetector.detect('/x/y/Process.BPMN')?.id).toBe('bpmn')
    expect(notationDetector.detect('/x/y/Decision.DMN')?.id).toBe('dmn')
  })

  it('maps the Miragon modeler suite files, including two-part extensions', () => {
    expect(notationDetector.detect('maps/tea.owm')?.id).toBe('wardley-map')
    expect(notationDetector.detect('maps/tea.wmap')?.id).toBe('wardley-map')
    expect(notationDetector.detect('org/teams.tt')?.id).toBe('team-topologies')
    expect(notationDetector.detect('org/teams.ttm.json')?.id).toBe('team-topologies')
    expect(notationDetector.detect('board/checkout.storm')?.id).toBe('event-storming')
    expect(notationDetector.detect('ddd/shop.cm')?.id).toBe('context-map')
    expect(notationDetector.detect('ddd/shop.CM.JSON')?.id).toBe('context-map')
    expect(notationDetector.detect('landscape/porter.vc')?.id).toBe('value-chain')
    expect(notationDetector.detect('landscape/porter.vc.json')?.id).toBe('value-chain')
  })

  it('leaves plain JSON files alone', () => {
    expect(notationDetector.detect('package.json')).toBeNull()
    expect(notationDetector.detect('config/settings.json')).toBeNull()
  })

  it('ignores dots in directories and returns null for unsupported files', () => {
    expect(notationDetector.detect('/a.b/c/readme.md')).toBeNull()
    expect(notationDetector.detect('/repo/-/blob/main/notes.txt')).toBeNull()
    expect(notationDetector.detect('/repo/-/blob/main/noext')).toBeNull()
    expect(notationDetector.detect('/repo/-/blob/main/order.bpmnx')).toBeNull()
    expect(notationDetector.detect(undefined)).toBeNull()
  })

  it('diffs only the notations that support a diff', () => {
    expect(notationDetector.isDiffable('x/Order.BPMN')).toBe(true)
    expect(notationDetector.isDiffable('x/rules.dmn')).toBe(false)
    expect(notationDetector.isDiffable('x/order.bpmnx')).toBe(false)
    expect(notationDetector.isDiffable(null)).toBe(false)
  })

  it('lists the file extensions every notation renders', () => {
    expect(notationDetector.fileExtensions()).toEqual([
      '.bpmn',
      '.dmn',
      '.owm',
      '.wmap',
      '.tt',
      '.ttm.json',
      '.storm',
      '.cm',
      '.cm.json',
      '.vc',
      '.vc.json',
      '.excalidraw',
    ])
  })
})
