import Entity from '@/models/entity/Entity'

export default interface Node {
    id: number

    parentId: number

    entities: Entity[]
}
