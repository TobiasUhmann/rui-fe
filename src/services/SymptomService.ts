import DeepSymptom from '@/models/DeepSymptom'
import Symptom from '@/models/Symptom'

export default {

    updateTaxonomy(): Promise<DeepSymptom[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/taxonomy`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .then(data => data.taxonomy)
            .catch(error => console.error(error))
    },

    putTaxonomy(formData: FormData): Promise<void | Response> {
        const fetchOptions = {
            method: 'PUT',
            body: formData
        }

        return fetch(`${process.env.VUE_APP_API_URL}/taxonomy`, fetchOptions)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    },

    postSymptom(symptom: Symptom): Promise<DeepSymptom> {
        const fetchOptions = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(symptom)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/symptom`, fetchOptions)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    },

    putSymptom(symptom: Symptom): Promise<void | Response> {
        const fetchOptions = {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(symptom)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/symptom`, fetchOptions)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    },

    deleteSymptom(symptom_id: number): Promise<void | Response> {
        const fetchOptions = {
            method: 'DELETE'
        }

        return fetch(`${process.env.VUE_APP_API_URL}/symptom/${symptom_id}`, fetchOptions)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    }
}
