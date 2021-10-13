import {DeepNode} from '@/models/node/deep-node'
import {Entity} from '@/models/entity/entity'

const entityAa1: Entity = {id: 1, nodeId: 1, name: 'Aa-1', matchesCount: 2}
const nodeAa: DeepNode = {id: 1, parentId: 0, entities: [entityAa1], children: []}

const entityAb1: Entity = {id: 2, nodeId: 2, name: 'Ab-1', matchesCount: 2}
const nodeAb: DeepNode = {id: 2, parentId: 0, entities: [entityAb1], children: []}

const entityAc1: Entity = {id: 12, nodeId: 7, name: 'Ac-1', matchesCount: 0}
const nodeAc: DeepNode = {id: 7, parentId: 0, entities: [entityAc1], children: []}

const entityA1: Entity = {id: 0, nodeId: 0, name: 'A-1', matchesCount: 2}
const nodeA: DeepNode = {id: 0, parentId: null, entities: [entityA1], children: [nodeAa, nodeAb]}
const nodeAWithNodeAc: DeepNode = {id: 0, parentId: null, entities: [entityA1], children: [nodeAa, nodeAb, nodeAc]}

const entityBa1: Entity = {id: 4, nodeId: 4, name: 'Ba-1', matchesCount: 1}
const entityBa2: Entity = {id: 5, nodeId: 4, name: 'Ba-2', matchesCount: 1}
const entityBa3: Entity = {id: 6, nodeId: 4, name: 'Ba-3', matchesCount: 0}
const entityBa4: Entity = {id: 7, nodeId: 4, name: 'Ba-4', matchesCount: 1}
const entityBa5: Entity = {id: 8, nodeId: 4, name: 'Ba-5', matchesCount: 1}
const nodeBa: DeepNode = {
    id: 4,
    parentId: 3,
    entities: [entityBa1, entityBa2, entityBa3, entityBa4, entityBa5],
    children: []
}

const entityBb1: Entity = {id: 9, nodeId: 5, name: 'Bb-1', matchesCount: 1}
const entityBb2: Entity = {id: 10, nodeId: 5, name: 'Bb-2', matchesCount: 1}
const nodeBb: DeepNode = {id: 5, parentId: 3, entities: [entityBb1, entityBb2], children: []}

const entityB1: Entity = {id: 3, nodeId: 3, name: 'B-1', matchesCount: 1}
const nodeB = {id: 3, parentId: null, entities: [entityB1], children: [nodeBa, nodeBb]}

const entityC1: Entity = {id: 11, nodeId: 6, name: 'C-1', matchesCount: 1}
const nodeC = {id: 6, parentId: null, entities: [entityC1], children: []}

export {nodeA}

export const getNodesResponse = [nodeA, nodeB, nodeC]

export const getNodesResponseWithNewNode = [nodeAWithNodeAc, nodeB, nodeC]
