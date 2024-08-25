import React, { useState } from 'react';
import Post from './Post';  
import usePosts from '../usePosts';
import useTopics from '../useTopics';
import axios from 'axios';

const PostsList = () => {
  const { posts, loading: postsLoading, error: postsError, setPosts } = usePosts();
  const { topics, loading: topicsLoading, error: topicsError } = useTopics();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('always');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTopic, setNewPostTopic] = useState('');
  const [newPostOther, setNewPostOther] = useState('');
  const [newPostImages, setNewPostImages] = useState(null); // New state for images
  const [error, setError] = useState(null);
  const postsPerPage = 5;

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleImagesChange = (event) => {
    setNewPostImages(event.target.files);
  };

  const getFilteredPosts = () => {
    let filtered = posts;

    if (selectedTopic) {
      filtered = filtered.filter(post => post.topic?.id === parseInt(selectedTopic));
    }

    const now = new Date();
    let dateLimit;

    switch (selectedDateRange) {
      case 'today':
        dateLimit = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'last7days':
        dateLimit = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'last30days':
        dateLimit = new Date(now.setDate(now.getDate() - 30));
        break;
      case 'last3months':
        dateLimit = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        dateLimit = null;
    }

    if (dateLimit) {
      filtered = filtered.filter(post => new Date(post.created_at) >= dateLimit);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        (post.content && post.content.toLowerCase().includes(searchTerm)) ||
        (post.topic?.name && post.topic.name.toLowerCase().includes(searchTerm)) ||
        (post.user?.name && post.user.name.toLowerCase().includes(searchTerm)) ||
        (post.other && post.other.toLowerCase().includes(searchTerm))
      );
    }

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('auth_token');

    const formData = new FormData();
    formData.append('content', newPostContent);
    formData.append('topic_id', newPostTopic);
    formData.append('other', newPostOther);

    if (newPostImages) {
      for (let i = 0; i < newPostImages.length; i++) {
        formData.append('images[]', newPostImages[i]);
      }
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/posts',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setPosts([response.data.data, ...posts]);  
      setNewPostContent('');
      setNewPostTopic('');
      setNewPostOther('');
      setNewPostImages(null); 
    } catch (err) {
      setError('Failed to create post.');
      console.error(err);
    }
  };

  if (postsLoading || topicsLoading) return <p>Loading posts and topics...</p>;
  if (postsError) return <p>Error loading posts: {postsError}</p>;
  if (topicsError) return <p>Error loading topics: {topicsError}</p>;

  return (
    <div className="posts-list-container">
      <div className="filter-container">
        <div className="filter-item">
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
        <div className="filter-item">
          <label htmlFor="date-range-select">Filter by Date:</label>
          <select id="date-range-select" value={selectedDateRange} onChange={handleDateRangeChange}>
            <option value="always">Always</option>
            <option value="today">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last3months">Last 3 Months</option>
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="sort-order-select">Sort by:</label>
          <select id="sort-order-select" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="search-input">Search:</label>
          <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search posts..."
          />
        </div>
      </div>

      <div className="posts-list">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p>No posts available for this filter.</p>
        )}
      </div>

      <div className="pagination">
        {[...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      <div className="create-post-container">
        <h3>Create a New Post</h3>
        <form onSubmit={handleCreatePost} encType="multipart/form-data">
          <div>
            <label htmlFor="new-post-topic">Select Topic:</label>
            <select
              id="new-post-topic"
              value={newPostTopic}
              onChange={(e) => setNewPostTopic(e.target.value)}
              required
            >
              <option value="">Choose a topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="new-post-content">Post Content:</label>
            <textarea
              id="new-post-content"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="new-post-other">Other Information:</label>
            <input
              type="text"
              id="new-post-other"
              value={newPostOther}
              onChange={(e) => setNewPostOther(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="new-post-images">Upload Images:</label>
            <input
              type="file"
              id="new-post-images"
              onChange={handleImagesChange}
              multiple
              accept="image/*"
            />
          </div>
          <button type="submit">Submit Post</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default PostsList;
