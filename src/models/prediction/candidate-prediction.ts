import Node from '@/models/node/node'

export default interface CandidatePrediction {
    score: number
    node: Node
}
