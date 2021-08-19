import Entity from '@/models/entity/Entity'

export default interface DeepNode {
    id: number,
    parent: number,
    children: DeepNode[],
    entities: Entity[]
}
