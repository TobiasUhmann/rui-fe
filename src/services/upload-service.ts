export const UploadService = {

    putUpload(formData: FormData): Promise<void> {
        const fetchOptions = {
            method: 'PUT',
            body: formData
        }

        return fetch(`${process.env.VUE_APP_API_URL}/upload`, fetchOptions)
            .then(response => console.debug(response))
            .catch(error => console.error(error))
    }
}
