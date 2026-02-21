import { PostItem } from '../PostItem/PostItem'
import type { Post } from '../../types'

interface Props {
  posts: Post[]
  loading: boolean
  userName: string
}

export const PostList = ({ posts, loading, userName }: Props) => {
  if (!userName) return null

  if (loading) {
    return <div className="loading">Загрузка постов...</div>
  }

  if (posts.length === 0) {
    return <p className="empty">Нет постов</p>
  }

  return (
    <div>
      <h2>Посты: {userName}</h2>
      <div className="posts-grid">
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}