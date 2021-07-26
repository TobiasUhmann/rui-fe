import Symptom from '@/models/symptom'

export default {

    getSymptoms(): Promise<Symptom[]> {
        return fetch('https://rui-be.herokuapp.com/api/1.0.0/symptoms')
            .then(response => response.json())
            .then(data => data.taxonomy)
    }
}
