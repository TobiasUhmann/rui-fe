import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'

export interface PredictionResponse {
    totalPredictions: number
    predictions: CandidateWithPredictions[]
}
