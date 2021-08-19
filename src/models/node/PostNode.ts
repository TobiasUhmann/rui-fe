import PostNodeEntity from '@/models/entity/PostNodeEntity'
import NodePatch from '@/models/node/NodePatch'

export default interface PostNode extends NodePatch{
    entities: PostNodeEntity[]
}
