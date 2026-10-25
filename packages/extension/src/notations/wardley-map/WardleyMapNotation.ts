import { NavigatedViewer } from '@miragon/wardley-renderer'
import rendererCss from '@miragon/wardley-renderer/assets/wardley.css?inline'
import { DiagramJsNotation } from '../DiagramJsNotation'
import type { ImportWarning } from '../DiagramJsViewer'
import { WARDLEY_MAP } from './descriptor'

export class WardleyMapNotation extends DiagramJsNotation<NavigatedViewer> {
  constructor() {
    super(WARDLEY_MAP, rendererCss)
  }

  protected createDiagram(container: HTMLElement): NavigatedViewer {
    return new NavigatedViewer({ container, fitOnImport: false })
  }

  protected async importSource(
    diagram: NavigatedViewer,
    source: string,
  ): Promise<readonly ImportWarning[]> {
    return (await diagram.importDSL(source)).warnings
  }
}
