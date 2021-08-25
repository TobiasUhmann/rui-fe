import Entity from '@/models/entity/entity'

export default interface DeepNode {
    id: number

    parentId: number

    entities: Entity[]
    children: DeepNode[]
}
