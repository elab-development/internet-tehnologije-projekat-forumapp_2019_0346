import React, { useState } from 'react';
import axios from 'axios';
import usePosts from '../usePosts';
import useTopics from '../useTopics';
import './Moderator.css';

const Moderator = () => {
  const { posts, setPosts, loading: loadingPosts, error: errorPosts } = usePosts();
  const { topics, setTopics, loading: loadingTopics, error: errorTopics } = useTopics();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDescription, setNewTopicDescription] = useState('');

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

  const handleCreateTopic = async () => {
    try {
      const token = sessionStorage.getItem('auth_token');
      if (token) {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/topics',
          {
            title: newTopicTitle,
            description: newTopicDescription,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setTopics([...topics, response.data.data]); // Dodaj novu temu u listu
        setIsModalOpen(false); // Zatvori modal
        setNewTopicTitle(''); // Resetuj polja
        setNewTopicDescription('');
      } else {
        throw new Error('No token found');
      }
    } catch (err) {
      console.error('Error creating topic:', err);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.content}</td>
              <td>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabela za teme */}
      <h2>Topics</h2>
      <button onClick={() => setIsModalOpen(true)}>Create New Topic</button>
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

      {/* Modal za kreiranje nove teme */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Topic</h2>
            <label>
              Title:
              <input
                type="text"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
              />
            </label>
            <label>
              Description:
              <textarea
                value={newTopicDescription}
                onChange={(e) => setNewTopicDescription(e.target.value)}
              />
            </label>
            <button onClick={handleCreateTopic}>Create</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Moderator;
