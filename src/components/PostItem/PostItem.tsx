import type { Post } from '../../types'

interface Props {
  post: Post
}

export const PostItem = ({ post }: Props) => {
  return (
    <div className="post-item">
      <p>{post.title}</p>
    </div>
  )
}