import {Node} from '@/models/node/node'

export interface DeepNode extends Node {
    children: DeepNode[]
}
