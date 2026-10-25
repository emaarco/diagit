import type { Notation, DiagramViewer } from '../Notation'
import { BPMN } from './descriptor'
import { BPMN_ASSET_CSS, BPMN_PANEL_CSS } from './bpmnCss'
import { BpmnDiffer } from './BpmnDiffer'
import { BpmnViewer } from './BpmnViewer'

export class BpmnNotation implements Notation {
  readonly descriptor = BPMN
  readonly css = BPMN_PANEL_CSS
  readonly assetCss = BPMN_ASSET_CSS
  readonly differ = new BpmnDiffer()

  createViewer(canvas: HTMLElement, xml: string): Promise<DiagramViewer> {
    return BpmnViewer.create(canvas, xml)
  }
}
