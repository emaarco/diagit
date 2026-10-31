import { exportScene, type ExportSceneData } from '@excalidraw/utils'
import type { Theme } from '../../../platform/utils/hostTheme'
import excalifontLatin from '../fonts/Excalifont-Latin.woff2?inline'
import virgil from '../fonts/Virgil.woff2?inline'

const FONT_FACES = `
  @font-face { font-family: "Excalifont"; src: url(${excalifontLatin}); }
  @font-face { font-family: "Virgil"; src: url(${virgil}); }
`
const GENERIC_FONT_FALLBACK = 'sans-serif'

export async function renderSceneSvg(scene: ExportSceneData, theme: Theme): Promise<string> {
  const svg = await exportScene({
    type: 'svg',
    data: scene,
    config: {
      theme,
      canvasBackgroundColor: false,
      skipInliningFonts: true,
      environment: { loadFonts: async () => {} },
    },
  })
  svg.querySelector('style.style-fonts')?.append(FONT_FACES)
  for (const text of svg.querySelectorAll('text')) {
    text.setAttribute(
      'font-family',
      `${text.getAttribute('font-family')}, ${GENERIC_FONT_FALLBACK}`,
    )
  }
  const markup = new XMLSerializer().serializeToString(svg)
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`
}
