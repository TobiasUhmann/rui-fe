import Entity from '@/models/entity/Entity'

export default interface PostNode {
    parent: number,
    entities: Entity[]
}
