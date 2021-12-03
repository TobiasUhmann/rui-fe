import {PredictionItem} from '@/models/prediction/prediction-item'

export interface Prediction {
    candidate: string
    dismissed: boolean

    totalScore: number
    totalScoreNorm: number

    parentPredictions: PredictionItem[]
    synonymPredictions: PredictionItem[]
}
