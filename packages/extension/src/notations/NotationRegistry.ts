import type { Notation, NotationLookup } from './Notation'
import { notationDetector, type NotationDetector } from './NotationDetector'

export class NotationRegistry implements NotationLookup {
  constructor(
    private readonly notations: readonly Notation[],
    private readonly detector: NotationDetector = notationDetector,
  ) {}

  detect(path: string | null | undefined): Notation | null {
    const descriptor = this.detector.detect(path)
    return this.notations.find((notation) => notation.descriptor === descriptor) ?? null
  }

  all(): readonly Notation[] {
    return this.notations
  }
}
