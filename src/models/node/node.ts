import Entity from '@/models/entity/entity'

export default interface Node {
    id: number

    parentId: number

    entities: Entity[]
}
