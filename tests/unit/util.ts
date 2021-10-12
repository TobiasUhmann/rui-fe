export function createFetchResponse<T>(value: T)
    : Promise<{ json: () => Promise<T> }> {

    return Promise.resolve({json: () => Promise.resolve(value)})
}
