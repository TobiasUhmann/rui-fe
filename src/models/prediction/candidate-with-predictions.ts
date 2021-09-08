import CandidatePrediction from '@/models/prediction/candidate-prediction'

export default interface CandidateWithPredictions {
    candidate: string

    parentPredictions: CandidatePrediction[]
    synonymPredictions: CandidatePrediction[]
}
