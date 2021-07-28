import Symptom from '@/models/symptom'

export default {

    symptoms: [] as Symptom[],

    getSymptoms(): Promise<Symptom[]> {
        return fetch('http://localhost:5000/api/1.0.0/symptoms')
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .then(data => data.taxonomy)
            .catch(error => console.error(error))
    },

    postSymptom(symptom: Symptom): Promise<Symptom> {
        const fetchOptions = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(symptom)
        }

        return fetch('http://localhost:5000/api/1.0.0/symptom', fetchOptions)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    },

    patchSymptom(symptom: Symptom): Promise<void | Response> {
        const fetchOptions = {
            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(symptom)
        }

        return fetch(`http://localhost:5000/api/1.0.0/symptom`, fetchOptions)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    },

    deleteSymptom(id: number): Promise<void | Response> {
        const fetchOptions = {
            method: 'DELETE'
        }

        return fetch(`http://localhost:5000/api/1.0.0/symptom/${id}`, fetchOptions)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    }
}
