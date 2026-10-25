import viewerCss from '../platform/ui/viewer.css?inline'
import { DiagramJsViewer, type DiagramJsDiagram, type ImportWarning } from './DiagramJsViewer'
import type { DiagramViewer, Notation } from './Notation'
import type { NotationDescriptor } from './NotationDescriptor'

const DOCUMENT_ROOT = /:root\b/g
const RENDERER_COLOURS_CLASS = 'renderer-colours'

export abstract class DiagramJsNotation<Diagram extends DiagramJsDiagram> implements Notation {
  readonly css: string
  readonly differ = null

  constructor(
    readonly descriptor: NotationDescriptor,
    readonly assetCss: string,
  ) {
    const rendererCssInShadowRoot = assetCss.replace(DOCUMENT_ROOT, ':host')
    this.css = [rendererCssInShadowRoot, viewerCss].join('\n')
  }

  createViewer(canvas: HTMLElement, source: string): Promise<DiagramViewer> {
    canvas.classList.add(RENDERER_COLOURS_CLASS)
    const rendererContainer = document.createElement('div')
    canvas.append(rendererContainer)
    const diagram = this.createDiagram(rendererContainer)
    return DiagramJsViewer.create(diagram, () => this.importSource(diagram, source))
  }

  protected abstract createDiagram(container: HTMLElement): Diagram

  protected abstract importSource(
    diagram: Diagram,
    source: string,
  ): Promise<readonly ImportWarning[]>
}
