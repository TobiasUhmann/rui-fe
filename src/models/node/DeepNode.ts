import Entity from '@/models/entity/Entity'

export default interface DeepNode {
    id: number

    parentId: number
    
    entities: Entity[]
    children: DeepNode[]
}
