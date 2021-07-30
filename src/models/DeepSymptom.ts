export default interface DeepSymptom {
    id: number | null,
    names: string[],
    parent: number | null,
    children: DeepSymptom[]
}
