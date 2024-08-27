import React from 'react';
import axios from 'axios';
import usePosts from '../usePosts';
import useTopics from '../useTopics';  // Uvezi useTopics hook
import './Moderator.css';  // Uvezi CSS stilove

const Moderator = () => {
  const { posts, setPosts, loading: loadingPosts, error: errorPosts } = usePosts();
  const { topics, setTopics, loading: loadingTopics, error: errorTopics } = useTopics();

  const handleDeletePost = async (id) => {
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

  const handleDeleteTopic = async (id) => {
    try {
      const token = sessionStorage.getItem('auth_token');
      if (token) {
        await axios.delete(`http://127.0.0.1:8000/api/topics/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTopics(topics.filter(topic => topic.id !== id));
      } else {
        throw new Error('No token found');
      }
    } catch (err) {
      console.error('Error deleting topic:', err);
    }
  };

  if (loadingPosts || loadingTopics) return <p>Loading...</p>;
  if (errorPosts || errorTopics) return <p>Error: {errorPosts || errorTopics}</p>;

  return (
    <div className="moderator-panel">
      <h1>Moderator Panel</h1>

      {/* Tabela za postove */}
      <h2>Posts</h2>
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
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <h2>Topics</h2>
      <table className="moderator-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id}>
              <td>{topic.id}</td>
              <td>{topic.title}</td>
              <td>{topic.description}</td>
              <td>
                <button onClick={() => handleDeleteTopic(topic.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Moderator;
