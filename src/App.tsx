import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [name, setName] = useState('')
  const [showingUserPosts, setShow] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async() => {
    await fetch('https://jsonplaceholder.typicode.com/users').then((res) => {
      return res.json()
    }).then((json: any) => setUsers(json))
  }

  const getPosts = async(id: number, name: string) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then((res) => {
      return res.json()
    }).then((json: any) => setPosts(json))
    setShow(true)
    setName(name)
  }

  return (
    <div className="App">
       {showingUserPosts === false ? (
          <div className="users">
          <h1>Users List</h1>
          {users.map((user: any) => {
            return (
              <div key={user.id} onClick={() => getPosts(user.id, user.name)} className="user">
                {user.name}
              </div>
            )
          })}
          </div>
       ) : (
       <div className="posts">
         <div className="name">
          <h1>{name}'s Posts</h1>
          <button className="return" onClick={() => setShow(false)}>Return to Users</button>
         </div>
         {posts.map((post: any) => {
           return (
             <div key={post.id} className="post">
               <h2>{post.title}</h2>
               <p>{post.body}</p>
             </div>
           )
         })}
       </div>
       )}
    </div>
  );
}

export default App;
