import { useEffect, useState } from 'react'
import { UserList } from './components/UserList/UserList'
import { PostList } from './components/PostList/PostList'
import type { User, Post } from './types'
import axiosApi from './axiosApi'
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
        const { data } = await axiosApi.get<User[]>('/users');
        setUsers(data);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      } finally {
        setLoadingUsers(false);
      }
    };
    void getUsers();
  }, []);

  const getPosts = async (userId: number) => {
    setLoadingPosts(true);
    try {
      const { data } = await axiosApi.get<Post[]>(`/posts?userId=${userId}`);
      setPosts(data);
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
    const user = users.find((u) => u.id === id);
    setSelectedName(user?.name || '');
    void getPosts(id);
  };

  return (
    <div className="app-container">
      <h1>Управление пользователями</h1>
      <div className="main-layout">
        <div className="sidebar">
          <UserList
            users={users}
            selectedId={selectedId}
            onSelect={handleSelect}
            loading={loadingUsers}
          />
        </div>
        <div className="content">
          {selectedId ? (
            <PostList
              posts={posts}
              loading={loadingPosts}
              userName={selectedName}
            />
          ) : (
            <div className="empty-state">Выберите пользователя, чтобы увидеть посты</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App