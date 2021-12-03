import {Node} from '@/models/node/node'

export interface PredictionItem {
    score: number
    scoreNorm: number
    node: Node
}
