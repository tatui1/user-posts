import type{ User } from '../../types'

interface Props {
  user: User
  onClick: () => void
  isSelected: boolean
}

export const UserCard = ({ user, onClick, isSelected }: Props) => {
  return (
    <div 
      className={`user-card ${isSelected ? 'selected' : ''}`}onClick={onClick}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.company.name}</p>
    </div>
  )
}