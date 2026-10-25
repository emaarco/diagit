import { NavigatedViewer } from '@miragon/context-maps-renderer'
import rendererCss from '@miragon/context-maps-renderer/assets/context-maps.css?inline'
import { DiagramJsNotation } from '../DiagramJsNotation'
import type { ImportWarning } from '../DiagramJsViewer'
import { CONTEXT_MAP } from './descriptor'

export class ContextMapNotation extends DiagramJsNotation<NavigatedViewer> {
  constructor() {
    super(CONTEXT_MAP, rendererCss)
  }

  protected createDiagram(container: HTMLElement): NavigatedViewer {
    return new NavigatedViewer({ container, fitOnImport: false })
  }

  protected async importSource(
    diagram: NavigatedViewer,
    source: string,
  ): Promise<readonly ImportWarning[]> {
    return diagram.importText(source).warnings
  }
}
