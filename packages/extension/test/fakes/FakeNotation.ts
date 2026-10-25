import type { DiagramDiffer, Notation, DiagramViewer } from '../../src/notations/Notation'
import { BPMN } from '../../src/notations/bpmn/descriptor'
import { FakeDiffableViewer } from './FakeDiffableViewer'
import { FakeDiffer } from './FakeDiffer'

export class FakeNotation implements Notation {
  readonly css = ''
  readonly assetCss = ''

  constructor(
    readonly descriptor = BPMN,
    readonly differ: DiagramDiffer | null = new FakeDiffer(),
  ) {}

  async createViewer(canvas: HTMLElement): Promise<DiagramViewer> {
    canvas.append(Object.assign(document.createElement('svg'), { className: 'fake-diagram' }))
    return new FakeDiffableViewer()
  }
}
