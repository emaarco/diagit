import { describe, expect, it, vi } from 'vitest'
import { DiagramJsViewer, type DiagramJsDiagram } from '../../src/notations/DiagramJsViewer'

class FakeDiagram implements DiagramJsDiagram {
  readonly destroy = vi.fn()
  readonly toggleZoomScroll = vi.fn()

  constructor(private readonly elementCount: number) {}

  get<T>(name: string): T {
    const services: Record<string, unknown> = {
      elementRegistry: { getAll: () => new Array(this.elementCount) },
      zoomScroll: { toggle: this.toggleZoomScroll },
      canvas: { resized: vi.fn(), zoom: vi.fn(() => 1), viewbox: vi.fn(() => undefined) },
    }
    return services[name] as T
  }
}

describe('DiagramJsViewer', () => {
  it('starts with wheel zoom off, so scrolling the page does not zoom the diagram', async () => {
    const diagram = new FakeDiagram(3)
    await DiagramJsViewer.create(diagram, async () => [])
    expect(diagram.toggleZoomScroll).toHaveBeenCalledWith(false)
  })

  it('reports the first import warning when nothing could be imported', async () => {
    const diagram = new FakeDiagram(1)
    const importSource = async () => [{ message: 'Line 1: unknown keyword' }]
    await expect(DiagramJsViewer.create(diagram, importSource)).rejects.toThrow(
      'Line 1: unknown keyword',
    )
    expect(diagram.destroy).toHaveBeenCalled()
  })

  it('keeps a diagram that imported despite warnings', async () => {
    const diagram = new FakeDiagram(4)
    const importSource = async () => [{ message: 'Line 7: ignored' }]
    await expect(DiagramJsViewer.create(diagram, importSource)).resolves.toBeInstanceOf(
      DiagramJsViewer,
    )
  })
})
