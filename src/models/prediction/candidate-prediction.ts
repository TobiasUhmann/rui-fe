import {Node} from '@/models/node/node'

export interface CandidatePrediction {
    score: number
    scoreNorm: number
    node: Node
}
