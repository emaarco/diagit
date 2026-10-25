import type { Notation, DiagramViewer } from '../Notation'
import { DMN } from './descriptor'
import { DMN_ASSET_CSS, DMN_PANEL_CSS } from './dmnCss'
import { DmnViewer } from './DmnViewer'

export class DmnNotation implements Notation {
  readonly descriptor = DMN
  readonly css = DMN_PANEL_CSS
  readonly assetCss = DMN_ASSET_CSS
  readonly differ = null

  createViewer(canvas: HTMLElement, xml: string): Promise<DiagramViewer> {
    return DmnViewer.create(canvas, xml)
  }
}
