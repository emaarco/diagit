import type { Notation, NotationLookup } from '../../src/notations/Notation'
import { DMN } from '../../src/notations/dmn/descriptor'
import { FakeNotation } from './FakeNotation'

export class FakeNotationLookup implements NotationLookup {
  constructor(
    private readonly notations: FakeNotation[] = [new FakeNotation(), new FakeNotation(DMN, null)],
  ) {}

  detect(path: string | null | undefined): Notation | null {
    return (
      this.notations.find((notation) =>
        notation.descriptor.extensions.some((e) => path?.endsWith(`.${e}`)),
      ) ?? null
    )
  }
}
