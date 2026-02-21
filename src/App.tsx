import { useEffect, useState } from 'react'
import { UserList } from './components/UserList/UserList'
import { PostList } from './components/PostList/PostList'
import type { User, Post  } from './types'
import { BASE_URL } from './constants'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedName, setSelectedName] = useState('')

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users`)
        if (!res.ok) throw new Error('Ошибка')
        const data = await res.json()
        setUsers(data)
      } catch (error) {
        console.log('Ошибка:', error)
      } finally {
        setLoadingUsers(false)
      }
    }
    getUsers()
  }, [])

  const getPosts = async (userId: number) => {
    setLoadingPosts(true)
    try {
      const res = await fetch(`${BASE_URL}/posts?userId=${userId}`)
      if (!res.ok) throw new Error('Ошибка')
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.log('Ошибка:', error)
      setPosts([])
    } finally {
      setLoadingPosts(false)
    }
  }

  const handleSelect = (id: number) => {
    setSelectedId(id)
    const user = users.find(u => u.id === id)
    setSelectedName(user?.name || '')
    getPosts(id)
  }

  return (
    <div className="app">
      <h1>Пользователи и посты</h1>
      <UserList 
        users={users}
        selectedId={selectedId}
        onSelect={handleSelect}
        loading={loadingUsers}
      />
      {selectedId && (
        <PostList 
          posts={posts}
          loading={loadingPosts}
          userName={selectedName}
        />
      )}
    </div>
  )
}

export default App