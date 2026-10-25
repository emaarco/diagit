import { NavigatedViewer } from '@miragon/event-storming-renderer'
import rendererCss from '@miragon/event-storming-renderer/assets/event-storming.css?inline'
import { DiagramJsNotation } from '../DiagramJsNotation'
import type { ImportWarning } from '../DiagramJsViewer'
import { EVENT_STORMING } from './descriptor'

export class EventStormingNotation extends DiagramJsNotation<NavigatedViewer> {
  constructor() {
    super(EVENT_STORMING, rendererCss)
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
