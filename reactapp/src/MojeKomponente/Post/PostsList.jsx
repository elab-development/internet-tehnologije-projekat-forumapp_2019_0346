import React, { useState } from 'react';
import Post from './Post';  
import usePosts from '../usePosts';
import useTopics from '../useTopics';

const PostsList = () => {
  const { posts, loading: postsLoading, error: postsError } = usePosts();
  const { topics, loading: topicsLoading, error: topicsError } = useTopics();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('always');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');  // Dodato stanje za sortiranje
  const postsPerPage = 5;  // Broj postova po strani

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    setCurrentPage(1); // Resetuj na prvu stranu kada se promeni filter
  };

  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
    setCurrentPage(1); // Resetuj na prvu stranu kada se promeni filter
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1); // Resetuj na prvu stranu kada se promeni sortiranje
  };

  const getFilteredPosts = () => {
    let filtered = posts;

    if (selectedTopic) {
      filtered = filtered.filter(post => post.topic.id === parseInt(selectedTopic));
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

    // Sortiranje postova po datumu kreiranja
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  // Logika za paginaciju
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    </div>
  );
};

export default PostsList;
