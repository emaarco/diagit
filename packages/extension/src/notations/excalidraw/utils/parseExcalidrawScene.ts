import type { ExportSceneData } from '@excalidraw/utils'

export function parseExcalidrawScene(source: string): ExportSceneData {
  const scene: unknown = JSON.parse(source)
  if (!isExcalidrawScene(scene)) throw new Error('Not an Excalidraw scene')
  return scene
}

function isExcalidrawScene(scene: unknown): scene is ExportSceneData {
  if (typeof scene !== 'object' || scene === null) return false
  const { type, elements } = scene as { type?: unknown; elements?: unknown }
  return type === 'excalidraw' && Array.isArray(elements)
}
