import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'

export interface PredictionsPage {
    totalPredictions: number
    totalSynonymPredictions: number
    totalChildPredictions: number
    predictions: CandidateWithPredictions[]
}
