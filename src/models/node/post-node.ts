import {PostNodeEntity} from '@/models/entity/post-node-entity'

export interface PostNode {
    parentId: null | number

    entities: PostNodeEntity[]
}
