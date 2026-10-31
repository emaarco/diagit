import type { Notation, DiagramViewer } from '../Notation'
import { EXCALIDRAW } from './descriptor'
import { EXCALIDRAW_ASSET_CSS, EXCALIDRAW_PANEL_CSS } from './excalidrawCss'
import { ExcalidrawViewer } from './ExcalidrawViewer'

export class ExcalidrawNotation implements Notation {
  readonly descriptor = EXCALIDRAW
  readonly css = EXCALIDRAW_PANEL_CSS
  readonly assetCss = EXCALIDRAW_ASSET_CSS
  readonly differ = null

  createViewer(canvas: HTMLElement, source: string): Promise<DiagramViewer> {
    return ExcalidrawViewer.create(canvas, source)
  }
}
