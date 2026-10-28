import { describe, expect, it } from 'vitest'
import {
  transactionBoundariesOf,
  usesCamunda7,
} from '../src/notations/bpmn/utils/transactionBoundaries'

describe('usesCamunda7', () => {
  it('recognises a model declaring the Camunda 7 namespace', () => {
    const definitions = { $attrs: { 'xmlns:camunda': 'http://camunda.org/schema/1.0/bpmn' } }
    expect(usesCamunda7(definitions)).toBe(true)
  })

  it('ignores Camunda 8 models', () => {
    const definitions = { $attrs: { 'xmlns:zeebe': 'http://camunda.org/schema/zeebe/1.0' } }
    expect(usesCamunda7(definitions)).toBe(false)
  })
})

describe('transactionBoundariesOf', () => {
  it('reads explicit async continuations', () => {
    const task = { $type: 'bpmn:ServiceTask', asyncBefore: true, asyncAfter: true }
    expect(transactionBoundariesOf(task)).toEqual({ before: true, after: true })
  })

  it.each([
    { $type: 'bpmn:UserTask' },
    { $type: 'bpmn:ReceiveTask' },
    { $type: 'bpmn:IntermediateCatchEvent' },
    { $type: 'bpmn:ServiceTask', type: 'external' },
  ])('treats the wait state $type as a boundary before the element', (waitState) => {
    expect(transactionBoundariesOf(waitState)).toEqual({ before: true, after: false })
  })

  it('reports no boundary for a synchronous task', () => {
    expect(transactionBoundariesOf({ $type: 'bpmn:ServiceTask' })).toEqual({
      before: false,
      after: false,
    })
  })
})
