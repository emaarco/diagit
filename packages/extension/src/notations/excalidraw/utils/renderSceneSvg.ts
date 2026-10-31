import { exportScene, type ExportSceneData } from '@excalidraw/utils'
import type { Theme } from '../../../platform/utils/hostTheme'
import excalifontLatin from '../fonts/Excalifont-Latin.woff2?inline'
import virgil from '../fonts/Virgil.woff2?inline'

const FONT_FACES = `
  @font-face { font-family: "Excalifont"; src: url(${excalifontLatin}); }
  @font-face { font-family: "Virgil"; src: url(${virgil}); }
`
const DEFAULT_CANVAS_BACKGROUND = '#ffffff'

export async function renderSceneSvg(scene: ExportSceneData, theme: Theme): Promise<string> {
  const svg = await exportScene({
    type: 'svg',
    data: scene,
    config: {
      theme,
      canvasBackgroundColor: customBackgroundOf(scene),
      skipInliningFonts: true,
      environment: { loadFonts: async () => {} },
    },
  })
  svg.querySelector('style.style-fonts')?.append(FONT_FACES)
  const markup = new XMLSerializer().serializeToString(svg)
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`
}

function customBackgroundOf(scene: ExportSceneData): string | false {
  const background = scene.appState?.viewBackgroundColor
  return background && background !== DEFAULT_CANVAS_BACKGROUND ? background : false
}
