import { useEffect, useState } from 'react'
import { UserList } from './components/UserList/UserList'
import type { User } from './types'
import { BASE_URL } from './constants'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<number | null>(null)

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
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  return (
    <div className="app">
      <h1>Пользователи и посты</h1>
      <UserList 
        users={users}
        selectedId={selectedId}
        onSelect={setSelectedId}
        loading={loading}
      />
    </div>
  )
}

export default App