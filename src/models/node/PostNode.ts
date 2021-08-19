import PostNodeEntity from '@/models/entity/PostNodeEntity'

export default interface PostNode {
    parent: number,
    entities: PostNodeEntity[]
}
