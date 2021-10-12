export const UploadService = {

    putUpload(formData: FormData): Promise<void | Response> {
        const fetchOptions = {
            method: 'PUT',
            body: formData
        }

        return fetch(`${process.env.VUE_APP_API_URL}/upload`, fetchOptions)
            .catch(error => console.error(error))
    }
}
