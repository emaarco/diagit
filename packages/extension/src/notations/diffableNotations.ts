import { BpmnNotation } from './bpmn/BpmnNotation'
import { NotationRegistry } from './NotationRegistry'

export const diffableNotations = new NotationRegistry([new BpmnNotation()])
