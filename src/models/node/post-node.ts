import PostNodeEntity from '@/models/entity/post-node-entity'

export default interface PostNode {
    parentId: null | number

    entities: PostNodeEntity[]
}
