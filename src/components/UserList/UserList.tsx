import { UserCard } from '../UserCard/UserCard'
import type { User } from '../../types'

interface Props {
  users: User[]
  selectedId: number | null
  onSelect: (id: number) => void
  loading: boolean
}

export const UserList = ({ users, selectedId, onSelect, loading }: Props) => {
  if (loading) {
    return <div className="loading">Загрузка...</div>
  }

  return (
    <div>
      <h2>Пользователи</h2>
      <div className="users-grid">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => onSelect(user.id)}
            isSelected={selectedId === user.id}
          />
        ))}
      </div>
    </div>
  )
}