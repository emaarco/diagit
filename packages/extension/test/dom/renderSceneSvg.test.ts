import { exportScene, type ExportSceneData } from '@excalidraw/utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderSceneSvg } from '../../src/notations/excalidraw/utils/renderSceneSvg'

vi.mock('@excalidraw/utils', () => ({ exportScene: vi.fn() }))

const SVG_NS = 'http://www.w3.org/2000/svg'

function exportedSvg(): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg')
  const style = document.createElementNS(SVG_NS, 'style')
  style.classList.add('style-fonts')
  svg.append(style)
  return svg
}

function sceneWithBackground(viewBackgroundColor?: string): ExportSceneData {
  return { elements: [], appState: { viewBackgroundColor } } as unknown as ExportSceneData
}

function exportedCanvasBackground(): unknown {
  const [options] = vi.mocked(exportScene).mock.calls[0]!
  return options.config?.canvasBackgroundColor
}

describe('renderSceneSvg', () => {
  beforeEach(() => {
    vi.mocked(exportScene).mockReset()
    vi.mocked(exportScene).mockResolvedValue(exportedSvg() as never)
  })

  it('leaves the default white background transparent, so the diagram blends into the host', async () => {
    await renderSceneSvg(sceneWithBackground('#ffffff'), 'light')

    expect(exportedCanvasBackground()).toBe(false)
  })

  it('leaves a scene without a background transparent', async () => {
    await renderSceneSvg(sceneWithBackground(), 'light')

    expect(exportedCanvasBackground()).toBe(false)
  })

  it('keeps a custom background, which light strokes rely on to stay visible', async () => {
    await renderSceneSvg(sceneWithBackground('#1e1e1e'), 'light')

    expect(exportedCanvasBackground()).toBe('#1e1e1e')
  })

  it('embeds the bundled fonts in the svg', async () => {
    const url = await renderSceneSvg(sceneWithBackground(), 'light')

    expect(decodeURIComponent(url)).toContain('@font-face { font-family: "Excalifont"')
  })
})
