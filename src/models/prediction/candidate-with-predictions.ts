import {CandidatePrediction} from '@/models/prediction/candidate-prediction'

export interface CandidateWithPredictions {
    candidate: string
    dismissed: boolean

    totalScore: number
    totalScoreNorm: number

    parentPredictions: CandidatePrediction[]
    synonymPredictions: CandidatePrediction[]
}
