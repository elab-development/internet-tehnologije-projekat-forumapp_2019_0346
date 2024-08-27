import React from 'react';
import axios from 'axios';
import usePosts from '../usePosts';
import './Moderator.css';  // Uvezi CSS stilove

const Moderator = () => {
  const { posts, setPosts, loading, error } = usePosts();

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('auth_token');
      if (token) {
        await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setPosts(posts.filter(post => post.id !== id));
      } else {
        throw new Error('No token found');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="moderator-panel">
      <h1>Moderator Panel</h1>
      <table className="moderator-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Topic ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.content}</td>
              <td>{post.topic_id}</td>
              <td>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Moderator;
