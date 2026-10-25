import { BPMN } from './bpmn/descriptor'
import { CONTEXT_MAP } from './context-map/descriptor'
import { DMN } from './dmn/descriptor'
import { EVENT_STORMING } from './event-storming/descriptor'
import type { NotationDescriptor } from './NotationDescriptor'
import { TEAM_TOPOLOGIES } from './team-topologies/descriptor'
import { VALUE_CHAIN } from './value-chain/descriptor'
import { WARDLEY_MAP } from './wardley-map/descriptor'

export const NOTATION_CATALOG: readonly NotationDescriptor[] = [
  BPMN,
  DMN,
  WARDLEY_MAP,
  TEAM_TOPOLOGIES,
  EVENT_STORMING,
  CONTEXT_MAP,
  VALUE_CHAIN,
]
