export default interface DeepEntity {
    id: number | null,
    names: string[],
    parent: number | null,
    children: DeepEntity[]
}
