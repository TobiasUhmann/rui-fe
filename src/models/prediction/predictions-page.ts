import {Prediction} from '@/models/prediction/prediction'

export interface PredictionsPage {
    totalPredictions: number
    totalSynonymPredictions: number
    totalChildPredictions: number
    predictions: Prediction[]
}
