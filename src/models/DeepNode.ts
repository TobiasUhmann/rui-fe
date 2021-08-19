export default interface DeepNode {
    id: number | null,
    names: string[],
    parent: number | null,
    children: DeepNode[]
}
