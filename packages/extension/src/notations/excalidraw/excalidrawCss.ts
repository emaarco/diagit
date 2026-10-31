import viewerCss from '../../platform/ui/viewer.css?inline'
import excalidrawCss from './excalidraw.css?inline'

export const EXCALIDRAW_ASSET_CSS = excalidrawCss

export const EXCALIDRAW_PANEL_CSS = [viewerCss, excalidrawCss].join('\n')
