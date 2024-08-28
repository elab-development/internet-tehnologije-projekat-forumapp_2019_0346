import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaUsers, FaRegCalendarAlt, FaClipboardList, FaThumbsUp } from 'react-icons/fa'; 

const AdminStatistike = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/admin/statistics', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStatistics(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading statistics.</p>;

  const barData = {
    labels: ['Total Users', 'Total Posts', 'Total Comments', 'Total Likes'],
    datasets: [
      {
        label: 'Overall Statistics',
        data: [
          statistics.total_users,
          statistics.total_posts,
          statistics.total_comments,
          statistics.total_likes
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }
    ]
  };

  const pieData = {
    labels: statistics.most_active_users_by_posts.map(user => user.name),
    datasets: [
      {
        label: 'Most Active Users by Posts',
        data: statistics.most_active_users_by_posts.map(user => user.posts_count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }
    ]
  };

  return (
    <div>
      <h2>Admin Dashboard Statistics</h2>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        margin: '20px 0' 
      }}>
        <div style={{ 
          textAlign: 'center', 
          flex: '1 1 45%', 
          margin: '10px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px' 
        }}>
          <FaUsers size={50} />
          <h3>Total Users</h3>
          <p>{statistics.total_users}</p>
        </div>
        <div style={{ 
          textAlign: 'center', 
          flex: '1 1 45%', 
          margin: '10px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px' 
        }}>
          <FaRegCalendarAlt size={50} />
          <h3>New Users Last 30 Days</h3>
          <p>{statistics.new_users_last_30_days}</p>
        </div>
        <div style={{ 
          textAlign: 'center', 
          flex: '1 1 45%', 
          margin: '10px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px' 
        }}>
          <FaClipboardList size={50} />
          <h3>Total Posts</h3>
          <p>{statistics.total_posts}</p>
        </div>
        <div style={{ 
          textAlign: 'center', 
          flex: '1 1 45%', 
          margin: '10px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px' 
        }}>
          <FaClipboardList size={50} />
          <h3>New Posts Last 30 Days</h3>
          <p>{statistics.new_posts_last_30_days}</p>
        </div>
        <div style={{ 
          textAlign: 'center', 
          flex: '1 1 45%', 
          margin: '10px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px' 
        }}>
          <FaClipboardList size={50} />
          <h3>Total Comments</h3>
          <p>{statistics.total_comments}</p>
        </div>
        <div style={{ 
          textAlign: 'center', 
          flex: '1 1 45%', 
          margin: '10px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px' 
        }}>
          <FaClipboardList size={50} />
          <h3>New Comments Last 30 Days</h3>
          <p>{statistics.new_comments_last_30_days}</p>
        </div>
        <div style={{ 
          textAlign: 'center', 
          flex: '1 1 45%', 
          margin: '10px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px' 
        }}>
          <FaThumbsUp size={50} />
          <h3>Total Likes</h3>
          <p>{statistics.total_likes}</p>
        </div>
        <div style={{ 
          textAlign: 'center', 
          flex: '1 1 45%', 
          margin: '10px', 
          padding: '20px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px' 
        }}>
          <FaThumbsUp size={50} />
          <h3>New Likes Last 30 Days</h3>
          <p>{statistics.new_likes_last_30_days}</p>
        </div>
      </div>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Bar data={barData} />
      </div>
      <div style={{ width: '50%', margin: '0 auto', marginTop: '50px' }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default AdminStatistike;
