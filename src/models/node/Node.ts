import Entity from '@/models/entity/Entity'

export default interface Node {
    id: number,
    parent: number,
    entities: Entity[]
}
