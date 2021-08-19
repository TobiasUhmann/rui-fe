import PostNodeEntity from '@/models/entity/PostNodeEntity'

export default interface PostNode {
    parentId: null | number

    entities: PostNodeEntity[]
}
