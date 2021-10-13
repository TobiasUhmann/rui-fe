import {CandidatePrediction} from '@/models/prediction/candidate-prediction'

export interface CandidateWithPredictions {
    candidate: string
    dismissed: boolean

    parentPredictions: CandidatePrediction[]
    synonymPredictions: CandidatePrediction[]
}
