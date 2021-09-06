import {Relation} from '@/models/prediction/relation'

export default interface Prediction {
    nodeId: number

    score: number
    relation: Relation
    candidate: string
}
