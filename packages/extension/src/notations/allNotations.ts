import { BpmnNotation } from './bpmn/BpmnNotation'
import { ContextMapNotation } from './context-map/ContextMapNotation'
import { DmnNotation } from './dmn/DmnNotation'
import { EventStormingNotation } from './event-storming/EventStormingNotation'
import { ExcalidrawNotation } from './excalidraw/ExcalidrawNotation'
import { NotationRegistry } from './NotationRegistry'
import { TeamTopologiesNotation } from './team-topologies/TeamTopologiesNotation'
import { ValueChainNotation } from './value-chain/ValueChainNotation'
import { WardleyMapNotation } from './wardley-map/WardleyMapNotation'

export const allNotations = new NotationRegistry([
  new BpmnNotation(),
  new DmnNotation(),
  new WardleyMapNotation(),
  new TeamTopologiesNotation(),
  new EventStormingNotation(),
  new ContextMapNotation(),
  new ValueChainNotation(),
  new ExcalidrawNotation(),
])
