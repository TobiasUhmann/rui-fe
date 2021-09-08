import Node from '@/models/node/node'

export default interface DeepNode extends Node {
    children: DeepNode[]
}
