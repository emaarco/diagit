import { describe, expect, it } from 'vitest'
import { parseExcalidrawScene } from '../src/notations/excalidraw/utils/parseExcalidrawScene'

describe('parseExcalidrawScene', () => {
  it('returns the scene of a .excalidraw file', () => {
    const source = JSON.stringify({ type: 'excalidraw', elements: [{ id: 'box' }], files: {} })

    expect(parseExcalidrawScene(source).elements).toEqual([{ id: 'box' }])
  })

  it('rejects JSON that is not an Excalidraw scene', () => {
    expect(() => parseExcalidrawScene('{"type":"excalidraw"}')).toThrow('Not an Excalidraw scene')
    expect(() => parseExcalidrawScene('null')).toThrow('Not an Excalidraw scene')
    expect(() => parseExcalidrawScene('{"type":"other","elements":[]}')).toThrow(
      'Not an Excalidraw scene',
    )
  })

  it('rejects text that is not JSON', () => {
    expect(() => parseExcalidrawScene('not json')).toThrow(SyntaxError)
  })
})
