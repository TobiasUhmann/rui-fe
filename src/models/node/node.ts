import Entity from '@/models/entity/entity'

export default interface Node {
    id: number

    parentId: number

    entities: Entity[]
}

export function getNodeName(node: Node): string {
    return `${node.entities[0].name} (+${node.entities.length - 1})`
}