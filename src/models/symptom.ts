export default interface Symptom {
    id: number | null,
    name: string,
    parent: number | null,
    children: Symptom[]
}
