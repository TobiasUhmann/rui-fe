import {nodeA} from '@/pages/predictions-page/fixtures/nodes'
import {PredictionResponse} from '@/models/prediction/prediction-response'
import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'

const prediction1: CandidateWithPredictions = {
    candidate: 'Erat imperdiet sed euismod nisi porta lorem mollis .',
    dismissed: false,
    parentPredictions: [{score: 1.0, node: nodeA}],
    synonymPredictions: []
}

const prediction2: CandidateWithPredictions = {
    candidate: 'Tempor orci dapibus ultrices in iaculis nunc sed .',
    dismissed: false,
    parentPredictions: [],
    synonymPredictions: [{score: 1.0, node: nodeA}]
}

const prediction3: CandidateWithPredictions = {
    candidate: 'Porta lorem mollis aliquam ut porttitor leo a diam .',
    dismissed: false,
    parentPredictions: [],
    synonymPredictions: [{score: 1.0, node: nodeA}]
}

export const getPredictionsResponse: PredictionResponse = {
    totalPredictions: 3,
    predictions: [prediction1, prediction2, prediction3]
}

export const getPredictionsResponseWithoutAnnotatedPrediction: PredictionResponse = {
    totalPredictions: 2,
    predictions: [prediction1, prediction2]
}
