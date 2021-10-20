export function mockFetchResponse<T>(urlEndsWith: string, fetchResponse: T)
    : (url: string) => Promise<{ json: () => Promise<T> }> {

    return (url: string) => {
        console.log(url)
        if (url.endsWith(urlEndsWith)) {
            return Promise.resolve({json: () => Promise.resolve(fetchResponse)})
        } else {
            console.error('ERROR')
            throw `URL ${url} does not end with ${urlEndsWith}`
        }
    }
}
