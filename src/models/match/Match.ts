export default interface Match {
    entityId: number

    ticket: number
    context: string
    mention: string
    mentionIndexes: number[]
}
