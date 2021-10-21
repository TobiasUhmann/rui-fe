import {Entity} from '@/models/entity/entity'

export interface Node {
    id: number

    parentId: number | null

    entities: Entity[]
}

export function getNodeName(node: Node): string {
    return `${node.entities[0].name} (+${node.entities.length - 1})`
}
