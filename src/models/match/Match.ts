export default interface Match {
    ticket: number,
    eid: number,
    mention: string,
    mentionIdxs: number[],
    context: string
}
