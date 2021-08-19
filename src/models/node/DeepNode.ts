import Node from '@/models/node/Node'
import Entity from '@/models/entity/Entity'

export default interface DeepNode extends Node {
    children: DeepNode[],
    entities: Entity[]
}
