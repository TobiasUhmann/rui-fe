import {Relation} from '@/models/prediction/relation'

export default interface Prediction {
    score: number
    relation: Relation
    candidate: string
}
