import Symptom from '@/models/symptom'

export default {

    symptoms: [] as Symptom[],

    getSymptoms(): Promise<Symptom[]> {
        return fetch('http://localhost:5000/api/1.0.0/symptoms')
            .then(response => response.json())
            .then(data => data.taxonomy)
            .catch(error => console.error(error))
    },

    addSymptom(symptom: Symptom): Promise<Symptom> {
        const fetchOptions = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(symptom)
        }

        return fetch('http://localhost:5000/api/1.0.0/symptom', fetchOptions)
            .then(response => response.json())
            .catch(error => console.error(error))
    }
}
