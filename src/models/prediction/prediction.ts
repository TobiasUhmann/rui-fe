import Node from '@/models/node/node'
import {Relation} from '@/models/prediction/relation'

export default interface Prediction {
    node: Node

    score: number
    relation: Relation
    candidate: string
}
