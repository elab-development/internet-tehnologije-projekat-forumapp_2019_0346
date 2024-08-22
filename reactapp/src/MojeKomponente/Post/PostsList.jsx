import React, { useState } from 'react';
import Post from './Post';  
import usePosts from '../usePosts';
import useTopics from '../useTopics';

const PostsList = () => {
  const { posts, loading: postsLoading, error: postsError } = usePosts();
  const { topics, loading: topicsLoading, error: topicsError } = useTopics();
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const filteredPosts = selectedTopic 
    ? posts.filter(post => post.topic.id === parseInt(selectedTopic))
    : posts;

  if (postsLoading || topicsLoading) return <p>Loading posts and topics...</p>;
  if (postsError) return <p>Error loading posts: {postsError}</p>;
  if (topicsError) return <p>Error loading topics: {topicsError}</p>;

  return (
    <div className="posts-list-container">
      <div className="filter-container">
        <label htmlFor="topic-select">Filter by Topic:</label>
        <select id="topic-select" value={selectedTopic} onChange={handleTopicChange}>
          <option value="">All Topics</option>
          {topics.map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
      </div>

      <div className="posts-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p>No posts available for this topic.</p>
        )}
      </div>
    </div>
  );
};

export default PostsList;
